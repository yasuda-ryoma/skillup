---
layout: default
title: STEP1-10.GitHub使ってソースをあげてみる
---
# STEP1-10.GitHub使ってソースをあげてみる

STEP1で今まで作ってきたファイルを管理してみましょう。
サンプルコードやこのWebサイトのソース管理をするため[GitHub](https://github.com/)を使ってみます。
GitHubではGitというバージョン管理システムを用いて進めます。


### GitHubアカウント作成

[アカウントを作成](https://github.com/join)にアクセスし、個人のアカウントを作成しましょう。

すでにアカウントをお持ちの方は既存のアカウントを使っていただいてOKです。


### リポジトリ作成

GitHub上で、リポジトリを作成します。レポジトリというのはアプリケーションのソースやデータの格納場所のことです。
上のタブの `Repositories` からレポジトリ一覧ページに進み、 `New` ボタンを押し、名前をつけて新しいレポジトリを作成します。ここでは、仮に「onlineskillup_step1」としてみます。

`https://github.com/<GitHubユーザ名>/onlineskillup_step1`

このようなURLのページが出来上がっているはずです。
中身はまだ空ですが、こちらが作成したレポジトリになります。

### Gitのインストール

自分のパソコンにGitをインストールをします。

macの方はデフォルトでGitが入っていますので、何もしなくても大丈夫です。  
Windowsの方は、以下のサイトなどを参考にして、Gitをインストールしてみてください。  
https://qiita.com/toshi-click/items/dcf3dd48fdc74c91b409

### ソースコードをあげる

上で作成したレポジトリにソースコードをあげます。この行為を「プッシュ」と言います。

念のため自分のソースコードのバックアップをとった上、ターミナル/コマンドプロンプトを開き下記のコマンドを実行してみましょう。
Windowsの方はコマンドプロンプトを開くとき、右クリックメニューから管理者権限で実行しましょう。
```
# 作成したソースコードがあるフォルダに移動
cd <フォルダ>

# Gitの初期化を行う
git init

# レポジトリの登録
git remote add origin https://github.com/<GitHubユーザ名>/onlineskillup_step1.git

# ユーザの登録
git config --local user.name <GitHubユーザ名>
git config --local user.email <メールアドレス>

# 変更を確定させる
git add .
git commit -m "first commit"

# 変更をプッシュする(パスワードが聞かれたら、GitHubの登録時のパスワードを入力)
git push -u origin master
```

ブラウザでレポジトリに移動し、ファイルがあがっていることを確認してください。


### 詳しく

#### Gitについて

Gitを使うことでファイルの編集を履歴として保存することができ、プログラムの変更を確認したり復活させたりすることができます。
また複数人で1つのプログラムを編集して開発する際にもよく使われています。

Gitについては[GitBook](http://git-scm.com/book/ja)に詳しく書かれているので参考になります。
Chapter1でGitの基本やインストール、Capter2で基本コマンドについて書かれています。

GitクライアントとしてはGitBookにも書かれている[Git for Windows](https://git-for-windows.github.io/)があります。
他にも[GitHub Windows](https://windows.github.com/)や[SourceTree](http://www.sourcetreeapp.com/)といったクライアントが主に使われています。
どのクライアントも同じgitの作業はできます。

#### GitHubについて

GitHubはGitというバージョン管理ツールを用いたプロジェクトを複数人で共有するためのツールです。GitとGitHubの違いをはっきりさせておくと理解が捗るかもしれません。
GitHubについては[GitHub入門](http://www.slideshare.net/hideaki_honda/gitgithub-16508298)が参考になります。また、[ギットクエスト](http://gigazine.net/news/20160126-gitquest-review/)のようなものもあり、勉強になります。

***  

**[課題]Gitを使いこなしてみよう**  
Gitは開発をスムーズにするための機能がたくさんあります。余裕があれば、Gitの基礎から学ぶことのできる[入門サイト](http://www.backlog.jp/git-guide/)やGitのコマンドを説明してくれる[チュートリアル](https://www.atlassian.com/ja/git/tutorial)などが公開されていますので、色々なコマンドを使ってみて、Gitによるバージョン管理に慣れてみましょう。


