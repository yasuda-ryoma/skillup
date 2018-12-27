# STEP2-7. 画像をアップロードしてみよう

Laravelで画像をアップロードして表示する機能を作ってみましょう。  
まずはViewでフォームを作ってみます。

## フォーム作成

`resources/views/home.blade.php` を作成

```php
<!-- エラーメッセージ。なければ表示しない -->
@if ($errors->any())
<ul>
    @foreach($errors->all() as $error)
    <li>{{ $error }}</li>
    @endforeach
</ul>
@endif

<!-- フォーム -->
<form action="{{ url('upload') }}" method="POST" enctype="multipart/form-data">

    <!-- アップロードした画像。なければ表示しない -->
    @isset ($filename)
    <div>
        <img src="{{ asset('storage/' . $filename) }}">
    </div>
    @endisset

    <label for="photo">画像ファイル:</label>
    <input type="file" class="form-control" name="file">
    <br>
    <hr>
    {{ csrf_field() }}
    <button class="btn btn-success"> Upload </button>
</form>
```

## コントローラ作成

次は作成したフォームを呼び出すコントローラを作ってみます。

`app/Http/Controllers/HomeController.php` を作成

```php
<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('home');
    }
}
```

home.blade.php を呼び出すだけです。  
これだけではまだ画面表示ができないので次にRouteを追加します。

## Route追加

`routes/web.php` の最後の行に追加

```php
Route::get('/', 'HomeController@index');
```

ようやく画面表示の準備ができたのでアプリケーションを起動してみましょう

```
$ php artisan serve
```

ブラウザで http://localhost:8000/ にアクセスすると下記のような画面が表示されます。

<img width="452" alt="localhost_8000_-_vivaldi" src="https://user-images.githubusercontent.com/342957/49427241-25972000-f7e6-11e8-9e9d-5466f5c2b122.png">

## アップロード実装

Uploadボタンに対応するコントローラの処理を追加してみましょう。

`app/Http/Controllers/HomeController.php` に追加

```php
    /**
     * ファイルアップロード処理
     */
    public function upload(Request $request)
    {
        $this->validate($request, [
            'file' => [
                // 必須
                'required',
                // アップロードされたファイルであること
                'file',
                // 画像ファイルであること
                'image',
                // MIMEタイプを指定
                'mimes:jpeg,png',
            ]
        ]);

        if ($request->file('file')->isValid([])) {
            $path = $request->file->store('public');
            return view('home')->with('filename', basename($path));
        } else {
            return redirect()
                ->back()
                ->withInput()
                ->withErrors();
        }
    }
```

バリデーションで正しいファイルがアップロードされたかを検証し、  
問題がなければ store() メソッドを使い `storage/app/public/` に保存します。  
その後画面で画像を表示するためにファイル名を取得し、ビューを表示させています。

upload メソッドが追加されたのでRouteも追加しておきましょう。

`routes/web.php` の最後の行に追加

```php
Route::post('/upload', 'HomeController@upload');
```

## 動作確認

ブラウザで http://localhost:8000/ にアクセスしファイルを選択し Upload ボタンをクリックします。  
ローカル上の storage/app/public/ には問題なく画像がアップロードされましたが、  
ブラウザ上では下記のように画像が表示されないと思います。

<img width="453" alt="localhost_8000_upload_-_vivaldi" src="https://user-images.githubusercontent.com/342957/49427949-0dc09b80-f7e8-11e8-8145-f342e4236e1d.png">

これはLaravelのデフォルトでは storage/app/public/ 配下はWebからのアクセスが許可されていません。  
Webからのアクセスを許可するために下記コマンドを打ってみましょう。

```
$ php artisan storage:link
```

これで public/storage から storage/app/public へシンボリックリンクが張られ、Webからアクセスできるようになりました。  
再度ファイルをアップロードして動作を確認してみましょう。

<img width="501" alt="localhost_8000_upload_-_vivaldi" src="https://user-images.githubusercontent.com/342957/49428187-b4a53780-f7e8-11e8-885a-7cb7bd407364.png">

## 課題

アップロードした直後の画像を表示するまでは実装できましたが、  
これまでにアップロードした全ての画像を表示するには画像の情報をDB等に保存する必要があります。  
画像情報を保存するテーブルを作成し、コントローラから画像のパス情報を保存して一覧表示も試してみましょう。
