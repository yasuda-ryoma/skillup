# STEP1-5.PHPを書いてみる

HTMLやCSSはあらかじめ書かれた内容を表示しているだけのものでした。PHPはサーバ側で動的にHTMLを生成するプログラムです。これによって、送信されたデータによってページの内容を変えることなどができるようになります。

また、サーバで実行できるプログラムには他にもRuby, Perl, Python, Javaなど様々なものがあります。

それでは実際にPHPを書いてみましょう。

開発環境のインストールディレトリ（skillup-php-step1-master）にあるappフォルダ内にindex.phpという名前のファイルがあるので、エディタでこのファイルを開いてください。  
初期状態ではブラウザの画面に「Hello World」と表示するだけのプログラムが書かれています。

```php
<?php echo '<p>Hello World</p>'; ?>
```

せっかくPHPを使っているのにあらかじめ書かれた内容を表示するだけでは意味がありません。

試しに現在の日付を取得して表示してみましょう。index.phpを以下のように変更してください。

```php
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>PHPのサンプル</title>
  </head>
  <body>
    <?php
      $date = date("Y/m/d H:i:s");
      print($date);
    ?>
  </body>
</html>
```
「[Dockerと開発環境の作り方](../04-docker.md)」での手順に従ってdocker-composeからコンテナを立ち上げ、  
Windows10のhomeEditionの方は[http://「Docker環境のIPアドレス」:9000]()、それ以外の方は[http://localhost:9000](http://localhost:9000)にアクセスしてみてください。  
現在の日時が表示されていれば成功です。

PHPはHTMLの中に組み込んで書きます。<?phpから?>までがPHPのプログラム本体です。  
PHPでは変数は先頭に$を付ける決まりになっています。  
dateは日付を文字列で返す関数、printは内容を表示する関数です。

## 基本構文

以下はPHPの基本的な構文とコード例です。もっと詳しく知りたい場合や、分からないことがある場合は[PHPマニュアル](http://php.net/manual/ja/index.php)を見ると良いでしょう。

### if文
```php
<?php
$a = 5;
if($a == 3) {
  print("$a is 3");
} else {
  print("$a is not 3");
}
?>
```
出力：

```text
5 is not 3
```

* ダブルクオーテーション内の変数は値に置き換わります。
* シングルクオーテーション内の変数は値に置き換わりません。

### for文
```php
<?php
//$iが0から10未満の間、1ずつ加算しながら繰り返し
for($i = 0; $i < 10; $i++){
  print("$i ");
}
?>
```
出力：

```text
0 1 2 3 4 5 6 7 8 9
```

* if, for以外の制御構造は[PHP: 制御構造](http://www.php.net/manual/ja/language.control-structures.php)を参照してください。

### 関数
```php
<?php
//引数の文字列を2回表示する関数
function double_print($text){
  print($text . $text);
}

double_print("a");
double_print("bc");
?>
```
出力：

```text
aabcbc
```

* 文字列の結合は.(ドット)演算子で行います。+ではありません。

### 配列
```php
<?php
//"one", "two", "three"を要素とする配列を作成
$a1 = array("one", "two", "three");
//配列$a1の末尾に"four"という要素を追加
$a1[] = "four";
////配列$a1の0番目の要素を変更
$a1[0] = "one?";
//表示
print_r($a1);
?>
```
出力：

```text
Array ( [0] => one? [1] => two [2] => three [3] => four )
```

* print_rは変数の構造と内容を全て書き出す関数です。

### 連想配列
```php
<?php
//$hash["one"]が"いち", $hash["two"]が"に", $hash["three"]が"さん"となる連想配列を作成
$hash = array("one" => "いち", "two" => "に", "three" => "さん");
$hash["four"] = "し";
print_r($hash);
//$hashの各要素を取り出して処理
foreach($hash as $key => $val)
  print("$key is $val. ");
?>
```
出力：

```text
Array ( [one] => いち [two] => に [three] => さん [four] => し ) one is いち. two is に. three is さん. four is し.
```

* PHPでは配列の添え字に文字列を使うことができ、これを連想配列と呼びます。
* 配列の詳しい仕様は[PHP: 配列](http://www.php.net/manual/ja/language.types.array.php)に記載されています。

### 正規表現
正規表現とは文字列のパターンを表現する方法です。たとえば、パスワードの形式を「半角英数字」というパターンに制限する際などに使用します。以下の例では「数字」というパターンを検索しています。

```php
<?php
if(preg_match('/(-?)[0-9]+(\.[0-9]+)?/', 'q-6.83p', $m)){
  print("match: $m[0] ");
  if($m[1] == "-")
    print("minus! ");
  if(isset($m[2]))
    print("decimal!");
} else {
  print("not match");
}
?>
```
出力：

```text
match: -6.83 minus! decimal!
```

* 正規表現の書き方についての解説はしません。知りたい方は各自で調べてください。
 * この資料自体は正規表現が書けなくても問題が無い構成になっています。
* preg_matchは第1引数の正規表現に第2引数がマッチしたかどうかを返します。
 * 第3引数に配列を渡すと、0番目の要素はマッチした部分全体、1番目以降の要素はマッチした()内の部分が格納されます。
* issetは変数がセットされており、かつNULLではないかチェックする関数です。
* その他分からない関数は[PHPマニュアル](http://php.net/manual/ja/index.php)の右上から検索できます。

## よくあるエラー・バグと対処法
### プログラムががそのまま表示される
<?phpと?>で囲んだ範囲のみがPHPのプログラムとして認識されます。その他の部分はHTML扱いですのでそのまま表示されます。

### Parse error
構文エラーです。エラーが発生しているファイル名と行番号が表示されていますので見直しましょう。1つ前の行でセミコロンを忘れている場合や、変数名に$を付け忘れている場合などがよくあります。

### 文字列の結合結果がおかしい
+演算子で結合していませんか？文字列の結合は.(ドット)演算子で行うのが正しいです。

### その他何かがおかしい
[var_dump関数](http://php.net/manual/ja/function.var-dump.php)で変数の情報を表示してみましょう。もう少し詳しいデバッグの方法はSTEP3で紹介します。
