basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'angular/angular.js',
  'angular/angular-*.js',
  'test/lib/angular/angular-mocks.js',
  '*.js',
  'test/*.js',
  'test/unit/**/*.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
