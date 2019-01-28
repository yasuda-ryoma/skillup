# Herokuで画像が表示されない問題

## Herokuでは画像の生成が行えない
Herokuで実際に動かす場合には、画像の処理を工夫しなければなりません。なぜならHerokuでは画像の生成ができないからです。
そのため、今までの「アップロードした画像をstorageフォルダに生成して、そのパスを保存する」という方法ができません。
ではどうするか？という話なのですが、簡単です。DBに画像のパスではなく、画像のバイナリデータを直接入れます。
そして、そのバイナリデータを表示することで実装します。

**※herokuの無料版にはこれ以外にも様々な制限があります。**
* DBに保存できるのは10000行である
* 一定時間経つとサーバーが勝手にSleepする...など


## DBに画像を入れ表示する流れ

**従来**
![](../images/image_to_strage.png)
今までは、上記のように画像ファイルをstorageに生成して、そのリンクをDBに格納するという方針をとっていました。ただ、前述したようにHerokuではファイルの生成が行えません。そのためstorageに画像が生成されていないのにDBにはそのパスが記録されていて画像がリンク切れになってしまいます。

**新方式**
![](../images/image_to_db.png)
そこで、ファイルを生成するのではなく画像バイナリデータをDBに直接入れてしまおうというのが新しい方式です。

## 実装手順
**大まかな流れ**
1. 画像バイナリを入れるカラム作成
1. 画像バイナリを取得しbase64エンコードしてDBに格納
1. base64の画像を表示

#### 画像バイナリを入れるカラム作成
画像を保存するテーブルと「bbs」とするとマイグレーションファイルはこのような感じになります。
```
Schema::create('bbs', function (Blueprint $table) {
    $table->increments('id');
    $table->integer('user_id'); 
    $table->string('comment'); 
    $table->text('image'); // 画像に関する記述
    $table->timestamps();
});
```
imageのバイナリデータを入れるカラムは「TEXT」に設定しておきます。

#### 画像バイナリを取得しbase64エンコードしてDBに格納
フォームの部分は変更ありませんが、説明しやすいように今回はこのようなフォームを用意したと仮定します。
```投稿画面フォーム
<form action="/bbs" method="POST" enctype="multipart/form-data" class="post_form">
    <div class="form_parts">
        <input type="file" name="image">
        <br>
        <br>
        <textarea name="comment" rows="4" cols="40"></textarea>
        <br>
        {{ csrf_field() }}
        <button class="btn btn-success">投稿</button>
    </div>
</form>
```

受け取った画像データをbase64でエンコードしてDBに格納します。

```controller
$image = base64_encode(file_get_contents($request->image->getRealPath()));
Bbs::insert([
    "image" => $image
]);
```

#### base64の画像を表示
表示する際はimgタグのsrc属性に「data:image/png;base64,」という値をつけてあげます。（base64でエンコードされた画像を表示するという記法）
```表示するview
<img src="data:image/png;base64,<?= image ?>">
```

このような感じです。