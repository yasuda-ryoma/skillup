# STEP2-3.Laravelを触ってみよう

この節では前節で環境構築した、 Laravelの基本的な使い方と機能について説明します。  
また、[STEP2-1](https://team-lab.github.io/skillup-php/step2/01-framework.html)で説明したフレームワークとMVCの概念についても、実際にLaravelを触りながら理解を深めていきましょう。


## 1. コントローラを作成してみる
例として、以下のURLにアクセスがあったと想定します。

    http://localhost/user

このアクセスによってlaravelはURLのドメイン以下に紐づくコントローラの処理を実行します。この例ではURLのドメイン部分「localhost」以下の「/user」に紐付いたコントローラの処理が実行されます。  

MVCにおいて、コントローラが担う役割は以下の通りです。  
* ModelにDBアクセス含めたデータの処理を行わせる。  
* Viewに実際の画面出力を行わせる。

では実際にuserコントローラを作成し、「/user」にアクセスがあった際にuserコントローラに記述された処理が実行されるようにしましょう。

「/app/http/controllers/UserController.php」を作成し、以下を記述してください。
```/app/http/controllers/UserController.php
<?php
namespace App\Http\Controllers;
class UserController extends Controller
{
    public function index()
    {
        // ただの変数定義ですが、ここでModelにデータの処理を行わせたりします（後述）。
        $name = 'yamada taro';

        // ここでuserビュー「user.blade.php」を呼び出し、データ「name」を渡している。
        return view('user', ['name' => $name]);
    }
}
```

ここではUserControllerというコントローラを定義しています。['name' => $name]でuserビュー「user.blade.php」にデータを渡しています。

## 2. ビューを作成してみる(画面の作成)

現時点ではUserControllerから呼び出されることになるビュー「user.blade.php」は存在しないので用意しましょう。  

/resources/views/内に以下の内容をuser.blade.phpという名前で保存し、  
こちらのファイルに実際の表示内容を記述します。  


```/resources/views/user.blade.php
<!-- UserControllerから渡されたnameを表示する -->
<h1>Hello!! {{$name}}</h1>
```

## 3. ルーティングの設定を行い、URLとコントローラの処理を紐付けてみる

現時点では http://localhost/user にアクセスしてもUserControllerの処理は呼び出されません。  
Laravelでは/routes/web.phpにルーティングの設定を行うことによってURLと呼出されるコントローラの処理を紐付けます。

では実際にURLの「/user」部分と、先ほど作成したUserControllerを紐づけてみましょう。  
/routes/web.phpに以下を追記してください。
```/routes/web.php
Route::get('/user', 'UserController@index');
```

これでURLの「/user」部分と、先ほど作成したUserControllerのindexメソッドが紐づけられました。

それではアクセスしてみます。http://localhost/user にアクセスしてみてください。  
ブラウザに「Hello!! yamada taro」と表示されるはずです。

<img src="../images/2_3_1.png" width="300">

## 4. モデルを使用してみる(DBアクセス)

次にモデルを使用し、データベースにアクセスしてみます。  
環境構築が完了した時点でUserモデルが存在しているため、今回はこちらを使用します。  
モデルの作成についてはマイグレーションという概念を理解する必要があるため、本節では取り扱いません。

まずはデータベースを作成しましょう。
「projectname/laradock/」ディレクトリに入り、以下のコマンドを実行しましょう。
```
$ docker-compose exec workspace bash
$ php artisan migrate
```

今回使用するUserモデルは「/app/User.php」に定義してあります。

ではコントローラからモデルを呼び出し、実際にDBを使用したデータの処理を行わせてみましょう。
/app/http/controllers/UserController.phpを以下のように編集してください。
```/app/http/controllers/UserController.php
<?php
namespace App\Http\Controllers;
use App\User;
class UserController extends Controller
{
    public function index()
    {
        // データの追加 emailの値はランダムな文字列を使用。「.」で文字列の連結
        $email = substr(str_shuffle('abcdefghijklmnopqrstuvwxyz'), 0, 8) . '@yyyy.com';
        User::insert(['name' => 'yamada taro', 'email' => $email, 'password' => 'xxxxxxxx']);
        // 全データの取り出し
        $users = User::all();
        return view('user', ['users' => $users]);    
    }
}
```

「User::insert(['name' => ......」 : DBへのデータの追加  
「$users = User::all();」 : DBからの全レコード取得  
が実際にモデルがデータの処理を行なっている箇所になります。

また、対応するビュー「user.blade.php」を以下のように変更します。

```
@foreach ($users as $user)
    <h1>Your name is {{$user->name}}. Your mail address is {{$user->email}}</h1>
@endforeach
```
[http://localhost/user](http://localhost/user)にアクセスしてみると以下の画像のように表示され、更新するごとに表示される文言が増えていくはずです。

<img src="../images/2_3_2.png" width="500">

[Laravel公式HP](https://laravel.com)にはLaravelの入門やドキュメントがありますので分からないことがあったら見てみましょう。

***

**[課題]コントローラ・ビューを追加し、任意のURLに紐づけてみましょう**  
何かコントローラ・ビューを追加し、URLとコントローラの処理をルーティングで紐づけてみましょう。 
「URLへのアクセス→コントローラでの処理→ビューの表示」の一連の流れを理解し、実装できればこの節での学習内容はバッチリです！
