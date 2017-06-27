# Pug(was Jade) Beautify CLI tool.

_Note :_ This program depends on [pug-beautify](https://github.com/vingorius/pug-beautify) module.

## Installation

```bash
npm i -g pug-beautifier-cli
```

## Usage

```bash
$ pug-beautifier [options] [file or glob]
```

Beautify `<file>` and overwrite it:

### Options

```bash
-h, --help                  output usage information
-V, --version               output the version number
-t, --filltab <tab_size>  	fill <tab_size> tabs rather than space, default 2 spaces.
-d, --keepdiv,              keep div tag, default not.
```

### Examples

Beautify `foo.pug`:

```bash
$ pug-beautifier foo.pug
```

Beautify `foo.jade` with 4 tabs, keep 'div' tag :

```bash
$ pug-beautifier -d -t 4 foo.jade
```

## License

[MIT](https://tldrlegal.com/license/mit-license)
