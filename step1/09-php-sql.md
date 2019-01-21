# STEP1-9.PHPでデータベースを操作してみる

ここでは、PHPでデータベースを操作してみます。
「[8.SQLを書いてみる](step1/08-sql.md)」で行った内容をアプリケーションから実行します。

## 接続する

まずはPHPからデータベースに接続しましょう。
[PDO](http://php.net/manual/ja/book.pdo.php)というドライバを使ってPostgreSQLに接続します。

新しいファイル`app/sql.php`を作成し、下記を書いてみてください。

```php
<?php
$dsn = 'pgsql:dbname=TEST;host=pgsql;port=5432';
$user = 'postgres';
$pass = 'example';

try {
  // DBに接続する
  $dbh = new PDO($dsn, $user, $pass);

  // ここでクエリ実行する

  // DBを切断する
  $dbh = null;
} catch (PDOException $e) {
    // 接続にエラーが発生した場合ここに入る
    print "DB ERROR: " . $e->getMessage() . "<br/>";
    die();
}
?>
```
[http://localhost:9000/sql.php](http://localhost:9000/sql.php) にアクセスしてみましょう。  
何も表示されない（＝エラーが表示されない）ようであれば、データベースへの接続は成功です。
エラーが発生したら、各種パラメータが合っているかどうか、PostgreSQLが起動しているかどうかなどを確認してみましょう。

上記コード内の下記の部分で、各種パラメータを入れてデータベースへの接続をしています。
```php
// DBに接続する
$dbh = new PDO($dsn, $user, $pass);
```

`$dsn`、`$user`、`$pass`の各変数については、その上の部分で代入しています。
```php
$dsn = 'pgsql:dbname=<DB名>;host=<ホスト名>;port=<ポート番号>';
$user = '<ユーザ名>';
$pass = '<ユーザのパスワード>';
```

「[4.Dockerと開発環境の作り方](step1/04-docker.md)」の手順で開発環境を構築している場合、ホスト名は`pgsql`、ユーザ名は`postgres`、パスワードは`example`になっているはずです。
また、データベース名は「[8.SQLを書いてみる](step1/08-sql.md)」で作ったものを使っているため、`TEST`を入れています。
違うデータベース名をつけた方や、最終課題で新たにデータベースを作る場合などは、データベース名を適したものにします。


## 実行する

PHPからクエリを実行するには、「[queryメソッド](http://php.net/manual/ja/pdo.query.php)」を使う方法や
「[prepareメソッド](http://php.net/manual/ja/pdo.prepare.php)」を使う方法などがあります。
それぞれのメソッドを使って、データベースに対してSELECTやINSERTを実行してみましょう。

### queryメソッドを使用したSELECTの例

上記の接続部分で、`// ここでクエリ実行する`という部分があったかと思います。
ここに[queryメソッド](http://php.net/manual/ja/pdo.query.php)を使ってクエリを書いて行きます。
```php
// ここでクエリ実行する
// queryメソッド(SELECT)
$query_result = $dbh->query('SELECT * FROM test_comments');
```
上記のように書くことで、`SELECT * FROM test_comments`というクエリを実行して、実行結果を`$query_result`という変数の中に入れています。
これだけでは、うまく取り出せたか確認できないので、`$query_result`を表示してみましょう。

`sql.php`の最下部に下記のように書いてみてください。
```php
<?php
  foreach($query_result as $row) {
    print $row["name"] . ": " . $row["text"] . "<br/>";
  }
?>
```
取得した`$query_result`は配列の形で入っているため、[foreach文](http://php.net/manual/ja/control-structures.foreach.php)を使って要素を1つずつ`$row`に詰めています。
ここでいう要素は、取得したtest_commentsテーブルのレコードに当たります。
`$row`自体はmapになっているため、ここでは「name」と「text」のみを取り出して、printしています。

うまくデータベースの値が取り出せましたでしょうか。


### prepareメソッドを使用したINSERTの例

次にレコードの登録をしてみます。INSERTには、[prepareメソッド](http://php.net/manual/ja/pdo.prepare.php)を使用します。
queryメソッド同様、`// ここでクエリを実行する`部分にクエリを書いていきます。
```php
// ここでクエリ実行する
// prepareメソッド(INSERT)
$sth = $dbh->prepare('INSERT INTO test_comments (name, text) VALUES (?, ?)');
```
クエリの中に`?`が出てきたことに気づきましたでしょうか。これが、prepareメソッドの一番の特徴です。  
prepareメソッドは、後から変数としてクエリに入れ込む値を入れることが出来るのです。ですので、まだこの段階ではINSERTは完了していません。

`sql.php`の最下部に下記のように書いてみてください。
```php
<?php
  $name = "John";
  $text = "Power to the People";
  $sth->execute(array($name, $text));
?>
```
何を行っているか確認してみましょう。
先ずは、`$name`という変数に「John」を`$text`という変数に「Power to the People」を代入しています。

その後の
```php
$sth->execute(array($name, $text));
```
の部分で、変数を渡して、`$sth`を実行しています。この部分がクエリの実行です。  
1つ目の`?`に`$name`を、2つめの`?`に`$text`を入れて、クエリを実行しています。

ブラウザを更新したら、データベースに登録されたか、pgAdminで確認してみましょう。  
Johnのレコードが入って入ればOKです！

今回は自分で変数を決めうちで入れているので、ありがたみがあまりありませんが、
実際はエンドユーザからPOSTで送られてきた値を登録するときに使います。


### prepareメソッドを使用したSELECTの例

感の鋭い方はもう気づかれているかもしれませんが、prepareメソッドはもちろんSELECT文でも使えます。
WHERE句を変数にして絞り込み検索をしてみましょう。

まず、`// ここでクエリを実行する`部分にクエリを書いていきます。
```php
// ここでクエリ実行する
// prepareメソッド(SELECT)
$sth_select = $dbh->prepare('SELECT * FROM test_comments WHERE name = ?');
```

`sql.php`の最下部に下記のように書いてみてください。
```php
<?php
  $name = "John";
  $sth_select->execute(array($name));
  $prepare_result = $sth_select->fetchAll();
  foreach($prepare_result as $row) {
    print $row["name"] . ": " . $row["text"] . "<br/>";
  }
  $sth_select->execute(array($name));
?>
```

新しく追加された部分は、
```php
$prepare_result = $sth_select->fetchAll();
```
かと思います。
ここでは、実行したクエリから実行結果を取得し、`$prepare_result`に代入しています。
あとは、以前と同様にforeach文で回しているだけですね。

このようにすることで、nameがJohnのレコードを絞りこんで表示できたはずです。

