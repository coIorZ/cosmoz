call plug#begin()
Plug 'scrooloose/nerdtree'
Plug 'scrooloose/nerdcommenter'
Plug 'tpope/vim-surround'
Plug 'raimondi/delimitmate'
Plug 'easymotion/vim-easymotion'
Plug 'mxw/vim-jsx'
Plug 'mhinz/vim-signify'
Plug 'mileszs/ack.vim'
Plug 'tpope/vim-repeat'
Plug 'pangloss/vim-javascript'
Plug 'w0rp/ale'
Plug 'HerringtonDarkholme/yats.vim'
Plug 'junegunn/fzf.vim'
Plug 'airblade/vim-rooter'
Plug 'itchyny/lightline.vim'
Plug 'maximbaz/lightline-ale'
Plug 'tpope/vim-fugitive'
Plug 'morhetz/gruvbox'
Plug 'maralla/completor.vim'
Plug 'ferreum/completor-tmux'
Plug '907th/vim-auto-save'
Plug 'nathanaelkane/vim-indent-guides'
call plug#end()


" => General settings
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
let mapleader=' ' " Map Leader
syntax on "turn on syntax highlighting
set updatetime=200
set mouse=a
set autoread "auto read files when modified outside
set ignorecase
set hlsearch
set incsearch
set fileencodings=ucs-bom,utf-8,cp936,gb18030,big5,euc-jp,euc-kr,latin1
set encoding=utf-8
" This allows buffers to be hidden if you've modified a buffer.
" This is almost a must if you wish to use buffers in this way.
set hidden
set clipboard=unnamed "use system clipboard as default
set noswapfile "disable .swp file
set scrolloff=3 "3 lines off the edge when scrolling
set noshowmode

colorscheme gruvbox
set termguicolors " need to export TERM=xterm-256color"
set background=dark
set t_Co=256
set guifont=Fira\ Code:h14
set cursorline "highlight the screen line of the cursor
"set cursorcolumn
set number "enable line numbers
set ruler "show the line and column number of the cursor position
set laststatus=2                             " always show statusbar
"set statusline=
"set statusline+=%-10.3n\                     " buffer number
"set statusline+=%f\                          " filename
"set statusline+=%h%m%r%w                     " status flags
"set statusline+=\[%{strlen(&ft)?&ft:'none'}] " file type
"set statusline+=%=                           " right align remainder
"set statusline+=0x%-8B                       " character value
"set statusline+=%-14(%l,%c%V%)               " line, character
"set statusline+=%<%P                         " file position
hi Search guibg=sienna guifg=SandyBrown


" => Customize
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
augroup Todo
  au!
  au Syntax * syn match myTodo /\v.TODO:/hs=s+1 containedin=.*Comment
  au Syntax * syn match myFixme /\v.FIXME:/hs=s+1 containedin=.*Comment
  au Syntax * syn match myNOTE /\v.NOTE:/hs=s+1 containedin=.*Comment
augroup END
hi myTodo guifg=violet
hi myFixme guifg=red
hi myNOTE guifg=DodgerBlue1


" => Editing
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set backspace=indent,eol,start "intuitive backspacing in insert mode
set autoindent "copy indent from current line when starting a new line
set smartindent
set tabstop=2 "number of spaces that a <Tab> in the file counts for
set softtabstop=2 "number of spaces that a <Tab> counts for while performing editing operations
set shiftwidth=2 "number of spaces to use for each step of (auto)indent
set expandtab "use the appropriate number of spaces to insert a <Tab>.
set smarttab "makes a <Tab> in front of a line insert blanks according to 'shiftwidth'


" => Key mappings
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Quick Escape
inoremap kj <Esc>
inoremap Kj <Esc>
inoremap kJ <Esc>
inoremap KJ <Esc>

" Pagedown 1/2
noremap <S-j> <C-d>
" Pageup 1/2
noremap <S-k> <C-u>
" Close the current buffer and move to the previous one
" This replicates the idea of closing a tab
nmap <Leader>q :bd<CR>
nmap <Leader>Q :bd!<CR>
" Create new [No Name] buffer
nmap <Leader>t :enew<CR>
" Cursor jump list
nmap <S-h> <C-o>
nmap <S-l> <C-i>
" Copy relative path
nmap <Leader>kp :let @+ = expand("%")<CR>
" Find current word
nnoremap <Leader>f *
" clear highlight
nnoremap <Leader>F :noh<CR>
" Navigate through split windows
nnoremap <Leader>wj <C-w>j
nnoremap <Leader>wk <C-w>k
nnoremap <Leader>wh <C-w>h
nnoremap <Leader>wl <C-w>l
" Paste to end of line
nnoremap Y v$y
" Go to bookmark
nnoremap ' `


" => Plugins
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" EasyMotion
""""""""""""""""""""""""""""""
map <Leader><Leader> <Plug>(easymotion-prefix)

" NERDTree
""""""""""""""""""""""""""""""
nmap <Leader>n :NERDTreeFind<CR>
let NERDTreeIgnore=['\.class$', '^\.git$', '\.DS_Store$']
let NERDTreeQuitOnOpen=1
let NERDTreeShowBookmarks=1

" NERDCommenter
""""""""""""""""""""""""""""""
let g:NERDCommentEmptyLines=1
let g:NERDCompactSexyComs=1
let g:NERDDefaultAlign='left'

" DelimitMate
""""""""""""""""""""""""""""""
let delimitMate_expand_cr=1
let delimitMate_expand_space=1

" Javascript
""""""""""""""""""""""""""""""
let g:javascript_plugin_flow=1

" Jsx
""""""""""""""""""""""""""""""
let g:jsx_ext_required=0 " Allow JSX in normal JS files

" Ack
""""""""""""""""""""""""""""""
nnoremap <Leader>a :Ack!<Space>
let g:ack_mappings={'o': '<CR><C-W><C-W>:ccl<CR>'}

" Signify
""""""""""""""""""""""""""""""
nmap > <Plug>(signify-next-hunk)
nmap < <Plug>(signify-prev-hunk)

" ALE
""""""""""""""""""""""""""""""
" `flow-language-server` needs to be installed globally
" and others installed locally
let g:ale_linters={
\   'javascript': ['flow', 'flow-language-server', 'eslint'],
\   'typescript': ['tsserver'],
\}
let g:ale_fixers={
\   'javascript': ['prettier', 'eslint'],
\   'typescript': ['prettier', 'tslint'],
\   'json': ['prettier'],
\   'css': ['prettier'],
\}
let g:ale_linters_explicit=1
let g:ale_sign_column_always=1
let g:ale_fix_on_save=1
"let g:ale_completion_enabled = 1
nnoremap gd :ALEGoToDefinition<CR>
nnoremap gf :ALEFindReferences<CR>

" FZF
""""""""""""""""""""""""""""""
" If installed using Homebrew
set rtp+=/usr/local/opt/fzf
nmap <Leader>p :FZF<CR>
nmap <Leader>r :History<CR>

" Rooter
""""""""""""""""""""""""""""""
let g:rooter_patterns=['.git/']
let g:rooter_silent_chdir=1
autocmd BufEnter * :Rooter

" Lightline
""""""""""""""""""""""""""""""
let g:lightline = {
\  'component_expand': {
\    'linter_checking': 'lightline#ale#checking',
\    'linter_warnings': 'lightline#ale#warnings',
\    'linter_errors': 'lightline#ale#errors',
\    'linter_ok': 'lightline#ale#ok'
\  },
\  'component_type': {
\    'linter_checking': 'left',
\    'linter_warnings': 'warning',
\    'linter_errors': 'error',
\    'linter_ok': 'left'
\  },
\  'active': {
\    'left': [[ 'mode', 'paste'], ['readonly', 'relativepath', 'modified']],
\    'right': [
\      ['lineinfo'],
\      ['percent'],
\      ['gitbranch'],
\      ['linter_checking', 'linter_errors', 'linter_warnings', 'linter_ok']
\    ]
\  },
\  'component_function': {
\    'gitbranch': 'fugitive#head'
\  }
\}

" Completor
""""""""""""""""""""""""""""""
inoremap <expr> <Tab> pumvisible() ? "\<C-n>" : "\<Tab>"
inoremap <expr> <S-Tab> pumvisible() ? "\<C-p>" : "\<S-Tab>"

" Fugitive
""""""""""""""""""""""""""""""
nnoremap <Leader>gb :Gblame<CR>
nnoremap <Leader>gs :Gstatus<CR>

" VimAutoSave
""""""""""""""""""""""""""""""
let g:auto_save = 0  " enable AutoSave on Vim startup
let g:auto_save_no_updatetime = 1  " do not change the 'updatetime' option
let g:auto_save_in_insert_mode = 0  " do not save while in insert mode

" IndentGuide
""""""""""""""""""""""""""""""
let g:indent_guides_enable_on_vim_startup = 1
let g:indent_guides_guide_size = 1
let g:indent_guides_exclude_filetypes = ['help', 'nerdtree']
let g:indent_guides_default_mapping = 0
