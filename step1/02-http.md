# STEP1-2.WEBサーバについて

## WEBサーバとクラウド

WEBサーバとは、クライアントとHTTPによる通信を行うプログラム及びコンピュータのことです。
現在では、AWS（Amazon Web Services）やGCP（Google Cloud Platform）のようなクラウドコンピューティング（インターネットなどのコンピュータネットワークを経由して、コンピュータ資源をサービスの形で提供する利用形態）が発達しており、物理的なWEBサーバをあまり意識しなくても良い場合も増えてきました。
このオンラインスキルアップで利用するHerokuもまたPaaSと呼ばれるクラウドコンピューティングの一種です。


## HTTP通信

WebサーバはHTTPというプロトコルを用いてクライアントと通信します。HTTP通信は必ずクライアント側のリクエストから開始され、サーバはこれにレスポンスを返します。リクエストではメソッドと呼ばれるもので動作を指定します。
メソッドにはいくつかの種類が存在しますが、ここではデータの取得に用いられる「GET」と、データの送信に用いられる「POST」について紹介しましょう。
なお、現在は暗号化することでセキュアを強化したHTTPSが利用されますが、ここではわかりやすくするために、HTTPで説明しています。

### GETメソッド

GETメソッドは単純にコンテンツを呼び出す際に用いられます。  

![](../images/1_2_1.png)

まず、クライアント（主にブラウザ）がWEBサーバに以下のようなリクエストを送ります。

    GET /index.html HTTP/1.1
    Host: example.com

これは、example.comという[ホスト名](http://e-words.jp/w/E3839BE382B9E38388E5908D.html)のサーバに対し、GETメソッドで/index.htmlという[URI](http://e-words.jp/w/URI.html)を要求していることを表します。これを受けてサーバは以下のようなレスポンスを返します。

    HTTP/1.1 200 OK
    Content-Type: text/html
    Content-Length: 25069
    Date: Fri, 10 May 2013 06:17:55 GMT

    (コンテンツ本体)

先頭行にある200はステータスコードと呼ばれ、レスポンスの意味を表しています。「200 OK」「403 Forbidden」「404 Not Found」など様々なものがあります。
2行目のContent-Typeは送信したファイルの種類を表しています。この場合はHTMLファイルですので「text/html」となっています。
最後に1行の空行を挟み、ファイル本体が送信されます。
これを受けてクライアントはファイルの内容を表示します。

### POSTメソッド

POSTメソッドは掲示板などの動的なコンテンツに書き込む際に用いられます。例として実在しない掲示板に「teamlab」という名前で「こんにちは」と書き込みする際の通信の様子を見てみましょう。

![](../images/1_2_2.png)

まず、クライアントがWEBサーバに以下のようなリクエストを送ります。（実在しないため実際にアクセスすると「404 Not Found」となります。）

    POST /write.php HTTP/1.1
    Host: example.com
    Content-Length: 93

    name=teamlab&text=%82%B1%82%F1%82%C9%82%BF%82%CD

POSTの場合はレスポンスと同じように最後に1行の空白を挟みデータを送信します。データは&で区切られ、各データごとに データの識別名=データ本体 という構造になっています。また、日本語などの送信できない文字は「%xx」(xは16進数)という形式に変換が行われてから送信されます。この変換をURLエンコードといいます。
サーバではデータを処理するプログラムが起動し、掲示板の更新処理などを行った後にGETの場合と同様にレスポンスを返します。

***


**[課題]実際の通信を見てみよう**  
GoogleChromeには「要素を検証」という機能があり、Webページの情報や通信の様子を見ることができます。右クリック→「検証」→「Network」タブでWebページの通信の様子が見れます。  
タブを開いている状態でページを更新したり、別のページを開いて色々なWebページの通信の様子を見てみましょう。
