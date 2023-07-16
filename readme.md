# 動作環境
- Docker  
- Docker compose v2.18.1  
- golang 1.20.2 darwin/amd64  

# 1. 初期設定
## 1-1. 必要ソフトウェアのインストール
上記記載のソフトウェア(Docker/Docker compose/golang)をインストールしてください。    
なお、フロントエンド部分の描写に使用しているソフトウェアはDocker経由でインストールされるため、必要ありません。    

## 1-2. Repositoryのダウンロード
gitコマンドやzip形式でのダウンロードなどを使用して、repositoryをダウンロードしてください。  

## 1-2. 各種変数の変更
(開発が間に合わなかったので)各種変数を以下のように手動で変更してください。  
`/docker/nginx/conf.d`の`server name:`の`localhost`を使用するサーバのIPアドレスに変更。  
`/frontend/pages/index.tsx`の変数`domain`を`localhost`から使用するサーバのIPアドレスに変更。　　

# 2. 起動方法
## 2-1. 問題セットの設定
```$ go run ./cmd/cli/main.go init```  
設定する問題の数を聞かれるので、問題数を設定します。  
この操作により、設定ファイルが/judgelight/settings以下に作成されます。  
その後、/judgelight/settingsディレクトリ内のファイルを変更し、問題の設定を行います。  
問題の設定についての詳細は「問題設定について」をご覧ください。  

問題の設定後、以下のコマンドを実行しDockerに問題内容を反映させます。   
```$ go run ./cmd/cli/main.go set```

## 2-2. ソフトウェアの実行
その後、dockerとバックエンド用のgoプログラムを以下のコマンドで走らせます。  
```$ go run ./cmd/backend/main.go```
```$ docker compose up```
（それぞれ別プロセスのターミナル）で実行してください。  

# 問題の設定方法
## settings.yamlの設定
Webページに表示する問題の数を`/settings/settings.yaml`内で指定する必要があります。  
六行目の`number-of-problem`の値を設定したい問題数に応じて変更してください。  
なお、その他の設定項目は将来的に実装予定の項目であり、変更する必要はありません。(変更してもプログラムには何の影響も及ぼしません)

## 問題設定ディレクトリについて
本プログラムは、`/settings`以下のディレクトリ/ファイルを変更することにより、問題を設定することができるようになっています。  
ここでは、例として`/settings/example`内のディレクトリを参考に説明します。  

`example`は、以下のようなディレクトリ構成になっています。  
```
.
├── 1
│   ├── examplecase
│   │   └── 1
│   │       ├── input.txt
│   │       └── output.txt
│   ├── problem.txt
│   └── testcase
│       └── 1
│           ├── input.txt
│           └── output.txt
└── 2
    ├── examplecase
    │   ├── 1
    │   │   ├── input.txt
    │   │   └── output.txt
    │   ├── 2
    │   │   ├── input.txt
    │   │   └── output.txt
    │   └── 3
    │       ├── input.txt
    │       └── output.txt
    ├── problem.txt
    └── testcase
        ├── 1
        │   ├── input.txt
        │   └── output.txt
        ├── 2
        │   ├── input.txt
        │   └── output.txt
        └── 3
            ├── input.txt
            └── output.txt
```
上記において、`./1`は問題番号1番に関するディレクトリであり、`./2`は問題番号2番に関するディレクトリです。   
それぞれに存在する`problem.txt`は各問題の問題文を格納しています。(txtファイルの内容がそのまま改行含めてWebページに表示されます)  
各問題以下に存在する`examplecase`、`testcase`ディレクトリは、テストケースを格納するディレクトリです。このテストケースはいくらでも増やすことができ、`./2`のように、3個以上設定することも可能です。  

## examplecaseとtestcaseの違い
`examplecase`内に設定した入力と出力の対応は、Webページに表示されます。  
`testcase`内に設定した入力と出力の対応は、Webページには表示されず、秘匿されます。  
どちらもdocker内でAC/WAの判定に使用されることは違いはありません。**全てのテストケースが**ACで通った場合のみ、ACとなります。

# 結果の確認方法
結果は、全てサーバ内に保存され、`/result`の中にcsv形式で書き込まれます。  
ファイル名は、画面上部で入力した`学籍番号.csv`となり、`ACした問題番号 , AC`の形で保存されます。  
これらは全てACした場合にのみ書き込まれるため、万が一全ての提出ファイルがWAの場合はそもそもファイル自体が作成されないので、ご注意ください。

# F&Q
- プログラムが全てCEとなる  
→Webページ上部に存在する学籍番号入力欄に、学籍番号を入力してください。
- 提出したプログラムがたまにCEになる
→Dockerの処理の都合上、一人のユーザが連投するとCEを吐き出すようになっています。ジャッジ中はsubmitを連打しないようにお願いします。  

# License
MIT (c) 2023 [@rp-agota](https://github.com/rp-agota)
