# 動作環境
- Docker  
- Docker compose v2.27.1  
- go version go1.22.4 linux/amd64

# 1. 初期設定
## 1-1. 必要ソフトウェアのインストール
上記記載のソフトウェア(Docker/Docker compose/golang)をインストールしてください。    
なお、フロントエンド部分の描写に使用しているソフトウェアはDocker経由でインストールされるため、必要ありません。    

## 1-2. Repositoryのダウンロード
gitコマンドやzip形式でのダウンロードなどを使用して、repositoryをダウンロードしてください。  

## 1-2. 各種変数の変更
各種変数を以下のように変更してください。  
`/docker/nginx/conf.d`の`server name:`の`localhost`を使用するサーバのIPアドレスに変更。  
`/frontend/config.json`の変数`domain`を`localhost`から使用するサーバのIPアドレスに変更。　　

# 2. 起動方法
## 2-1. ソフトウェアの実行
dockerとバックエンド用のgoプログラムを以下のコマンドで走らせます。  
```$ cd cmd/backend && go run main.go```
```$ docker compose up```
（それぞれ別プロセスのターミナル）で実行してください。  

## 2-2. 問題セットの設定
```$ cd cmd/cli/ && go run main.go set -f setting.yaml```  
この操作により、`setting.yaml`に記述した設定事項がデータベースに記録されます．
その後、/judgelight/settingsディレクトリ内のファイルを変更し、問題の設定を行います。  
問題の設定についての詳細は「問題設定について」をご覧ください。  

# 問題設定について
設定ファイルとしてYAMLファイルを採用しています．YAMLファイルにて設定できる項目は以下の通りです．
```
contest_infomation: //コンテスト情報を設定できます
  title: "Contest Title"    //コンテストのタイトルを設定できます
  start_time: "2023-01-01 00:00:00" //コンテストの開始時間を設定できます
  end_time: "2023-01-01 00:00:00"   //コンテストの終了時刻を設定できます

problem:    //問題情報を設定できます
  - number: 1   //第一問目に関する設定です
    title: "Problem Title"  //問題のタイトルを設定できます
    score: 100  //問題の得点を設定できます
    limit_execute_time: 10  //実行制限時間を設定できます
    limit_execute_memory: 256   //実行メモリの制限を設定できます
    description: "Problem Description"  //問題文を設定できます
    input_description: "Input Description"  //入力に関する説明を設定できます
    output_description: "Output Description"    //出力に関する説明を設定できます

    initial_code: |-    //ページに表示されるコードを設定できます
      #include<stdio.h>
      int main(void){
        int a,b;
        scanf("%d %d",&a,&b);
        printf("%d\n",a+b);
        return 0;
      }

    testcases:  //テストケースを設定できます
      - input: |- 
          1 2
        output: |-
          3

      - input: |- 
          5 6
        output: |-
          11

    secretcases:    //非公開のテストケースを設定できます
      - input: |- 
          2 2
        output: |-
          4

      - input: |- 
          0 10
        output: |-
          10

      - input: |- 
          22 2
        output: |-
          24
```


## examplecaseとtestcaseの違い
`testcase`内に設定した入力と出力の対応は、Webページに表示されます。  
`secretcase`内に設定した入力と出力の対応は、Webページには表示されず、秘匿されます。  
どちらもdocker内でAC/WAの判定に使用されることは違いはありません。**全てのテストケースが**ACで通った場合のみ、ACとなります。

# 結果の確認方法
結果は、全てサーバ内に保存されます．結果を出力するときは以下のコマンドを入力してください．
```$ cd cmd/cli && go run main.go total -f <出力したいEXCELファイルのパス>```

# License
MIT (c) 2023-2024 [@admidori](https://github.com/admidori)
