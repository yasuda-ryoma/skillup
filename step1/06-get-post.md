# STEP1-6.PHPでGET/POSTをやってみる

[2.HTTPのしくみ](./02-http.md)において、GETはデータの取得と説明しましたが、POSTと同様の形式のデータをURLの最後に付加することにより送信することもできます。

例えば、Windows10のhomeEditionの方は [http://「Docker環境のIPアドレス」:9000/index.php?comment=ohayooooo]() というURLで、それ以外の方は [http://localhost:9000/index.php?comment=ohayooooo](http://「Docker環境のIPアドレス」:9000/index.php?comment=ohayooooo) というURLでデータを送信することができます。

この場合、URLが伸びることになりURLの長さ制限に引っかかる場合があるので気をつけましょう。

POSTで送信されたデータをPHPから受け取ってみましょう。
index.phpを以下のように変更してください。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>POSTのサンプル</title>
  </head>
  <body>
    <?php
      //commentがPOSTされているなら
      if(isset($_POST["comment"])){
        //エスケープしてから表示
        $comment = htmlspecialchars($_POST["comment"]);
        print("あなたのコメントは「 ${comment} 」です。");
      } else {
    ?>
        <p>コメントしてください。</p>
        <form method="POST" action="index.php">
          <input name="comment" />
          <input type="submit" value="送信" />
        </form>
    <?php
      }
    ?>
  </body>
</html>
```

GETで送受信をする場合は$_POSTの部分を$_GETに、method="POST"をmethod="GET"に変更します。  
GET,POSTで送信されたデータはそれぞれ$_GET,$_POSTという連想配列に格納されています。issetで中身を確認し、存在する場合はコメントを表示、存在しない場合はフォームを表示するようになっています。

表示の際にはhtmlspecialchars関数で必ずエスケープしましょう。エスケープとは、特殊な意味があり表示できない文字を他の文字列に変換することです。HTMLの場合、<>などの文字はタグに使用されるため、それらを表示するには`&lt;` `&gt;`と書く必要があります。

一方、送信部はformタグを用いてHTMLで書かれています。methodでメソッドを、actionで送信先URLを指定します。formタグ内のinput,select,textareaタグの内容が送信されます。送信する際の識別名はnameで指定します。

**[課題]送信する内容を変更してみよう**  
掲示板に必要な情報としては少なくとも名前と本文が必要です。名前も送信し、受け取るように変更してみましょう。余力のある人はタイトル・文字色・メールアドレスなども追加してみましょう。
