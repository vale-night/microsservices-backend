<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use RecursiveIteratorIterator;

class VendorCleanup extends Command
{
    protected $signature = 'vendor:cleanup {--o : Verbose Output} {--dry : Runs in dry mode without deleting files.} {--silent : Doesnt show detailed output.}';
    protected $description = 'Cleans up useless files from vendor folder.';

    // Default patterns for common files
    protected $patterns = [
        '.git',
        '.github',
        'test',
        'tests',
        'docs',
        'travis',
        'demo',
        'demos',
        'example',
        'examples',
        'todo',
        'license',
        'changelog*',
        'contributing*',
        'upgrading*',
        'upgrade*',
        '.idea',
        '.vagrant',
        'readme*',
        '_ide_helper.php',
        '{,.}*.yml',
        '*.dist',
        '*.md',
        '*.log',
        '*.txt',
        '*.pdf',
        '*.xls',
        '*.doc',
        '*.docx',
        '*.png',
        '*.gif',
        '*.bmp',
        '*.ico',
        '*.jpg',
        '*.jpeg',
        '.php_cs*',
        '.scrutinizer',
        '.gitignore',
        '.gitattributes',
        '.editorconfig',
        'dockerfile',
        'phpcs.xml',
        'phpunit.xml',
        'build.xml',
        'package.xml',
        'package.json',
        'Makefile',
        'Doxyfile',
        'gulpfile.js',
        'bower.json',
        'karma.conf.js',
        'yarn.lock',
        '.babelrc',
        'package.js',
        '.htaccess',
        'CNAME',
        'LICENSE*',
        '.gitmodules'
    ];

    // These paths/patterns will NOT be deleted
    protected $excluded = [];

    protected $included = [
        'aws/aws-sdk-php/src/data/ec2',
        'aws/aws-sdk-php/src/data/cloudfront',
        'aws/aws-sdk-php/src/data/sagemaker',
        'aws/aws-sdk-php/src/data/iot',
        'aws/aws-sdk-php/src/data/medialive',
        'aws/aws-sdk-php/src/data/clouddirectory',
        'aws/aws-sdk-php/src/data/chime',
    ];

    private $totalFilesize = 0;
    private $totalFiles = 0;

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $patterns = array_diff($this->patterns, $this->excluded);

        $directories = $this->expandTree(base_path('vendor'));

        $isDry = $this->option('dry');
        $isQuiet = $this->option('silent');

        $this->info("Starting Vendor Cleanup");

        foreach ($directories as $directory) {
            foreach ($patterns as $pattern) {

                $casePattern = preg_replace_callback('/([a-z])/i', [$this, 'prepareWord'], $pattern);

                $files = glob($directory . '/' . $casePattern, GLOB_BRACE);

                if (!$files) {
                    continue;
                }

                $files = array_diff($files, $this->excluded);

                foreach ($this->excluded as $excluded) {
                    $key = $this->arrayFind($excluded, $files);

                    if ($key !== false) {
                        if(!$isQuiet) {
                            $this->warn('Skipped: '.$files[$key]);
                        }

                        unset($files[$key]);
                    }
                }

                foreach ($files as $file) {
                    if (is_dir($file)) {
                        if(!$isQuiet) {
                            $this->comment('Directory: '.$file);
                        }

                        $this->delTree($file);
                    } else {
                        if(!$isQuiet) {
                            $this->info('File: '.$file);
                        }

                        $this->totalFilesize += filesize($file);
                        $this->totalFiles++;

                        if (!$isDry) {
                            @unlink($file);
                        }
                    }
                }
            }
        }

        foreach ($this->included as $file) {
            $file = base_path('vendor').'/'.$file;
            if (!file_exists($file) && !is_dir($file)) {
                return false;
            }

            if (is_dir($file)) {
                if(!$isQuiet) {
                    $this->comment('Directory: '.$file);
                }

                $this->delTree($file);
            } else {
                if(!$isQuiet) {
                    $this->info('File: '.$file);
                }

                $this->totalFilesize += filesize($file);
                $this->totalFiles++;

                if (!$isDry) {
                    @unlink($file);
                }
            }
        }

        $fs = $this->bytesToHuman($this->totalFilesize);
        $this->warn("Total Files: {$this->totalFiles}");
        $this->warn("Total Filesize: {$fs}");
        $this->info('Vendor Cleanup Done!');
    }

    private function bytesToHuman($bytes)
    {
        $units = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB'];

        for ($i = 0; $bytes > 1024; $i++) {
            $bytes /= 1024;
        }

        return round($bytes, 2) . ' ' . $units[$i];
    }

    /**
     * Recursively traverses the directory tree
     *
     * @param  string $dir
     * @return array
     */
    protected function expandTree($dir)
    {
        $directories = [];
        $files = array_diff(scandir($dir), ['.', '..']);

        foreach ($files as $file) {
            $directory = $dir . '/' . $file;

            if (is_dir($directory)) {
                $directories[] = $directory;
                $directories = array_merge($directories, $this->expandTree($directory));
            }
        }

        return $directories;
    }

    /**
     * Recursively deletes the directory
     *
     * @param  string $dir
     * @return bool
     */
    protected function delTree($dir)
    {
        if (!file_exists($dir) || !is_dir($dir)) {
            return false;
        }

        $iterator = new RecursiveIteratorIterator(new \RecursiveDirectoryIterator($dir, \FilesystemIterator::SKIP_DOTS),
            \RecursiveIteratorIterator::CHILD_FIRST);

        foreach ($iterator as $filename => $fileInfo) {
            if ($fileInfo->isDir()) {

                if(!$this->option('silent')) {
                    $this->comment("Dir: {$filename}");
                }

                if(!$this->option('dry')){
                    @rmdir($filename);
                }

            } else {

                if(!$this->option('silent')) {
                    $this->info("File: {$filename}");
                }

                $this->totalFilesize += filesize($filename);
                $this->totalFiles ++;

                if(!$this->option('dry')){
                    @unlink($filename);
                }

            }
        }

        if(!$this->option('dry')){
            @rmdir($filename);
        }
    }

    /**
     * Prepare word
     *
     * @param  string $matches
     * @return string
     */
    protected function prepareWord($matches)
    {
        return '[' . strtolower($matches[1]) . strtoupper($matches[1]) . ']';
    }

    protected function arrayFind($needle, array $haystack)
    {
        foreach ($haystack as $key => $value) {
            if (false !== stripos($value, $needle)) {
                return $key;
            }
        }

        return false;
    }

    protected function out($message)
    {
        if ($this->option('o') || $this->option('dry')) {
            echo $message . PHP_EOL;
        }
    }
}