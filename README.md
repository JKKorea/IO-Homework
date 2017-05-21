# IO-Homework
IO-Homework

# 요구사항
  - [x] 1. bitcoin_request(hash)
  >+ 트랜잭션(tx) 수 = n_tx
  >+ 평균 트랜잭션의 값(value) = (out_value / n_tx)
  >+ 평균 트랜잭션의 수수료(fee) = (fee / n_tx)
  >+ 평균 트랜잭션의 크기(size) = (size / n_tx)

  - [x] 2. bitcoin_outinfo(hash)
  >+ out 내용 출력(spend, tx_index, type, addr, value, n, script)

# 문제 접근 방식
  - node.js를 사용한 이유 -> IO에서 사용, bitcoin 관련 lib와 자료.
  - 규모 고려 -> 비트코인 개발자 api 요청 limit 고려 -> key 발급 소요시간 2~3 days <br>
    일단은 request(maxmimum of 1 every 10 seconds) -> 추후 과정 고려.
  - 참고사항의 블록 확인 API와 용어 정리를 참고하여 직접적으로 주어지지 않은 것은 계산. (요구사항1)
  - 모듈화 -> bitcoin_request(), bitcoin_outinfo()로 기능 분리.
  - 개선 해야할 사항(JSON Parse) -> 각 함수 당 forEach 2번씩 사용(속도 저하)  
  - TDD (check api server status, value)

# 기능
  >+ 트랜잭션 정보 조회(요구사항1)
  >+ 트랜잭션 out정보 조회(요구사항2) -> console
  >+ Create My Wallet -> bitcore-lib 사용
  >+ BTC USD Converter -> bitcore-lib 사용

# 진행사항
  - [x] <a href="http://bitpeople.kr/bbs/board.php?bo_table=Info_BIP&wr_id=38" target="_blank">용어 정리</a>
  - [x] 기능구현
  - [x] console -> web
  - [x] TDD (Mocha)
  - [x] 모듈화 (bitcoin_request, bitcoin_outinfo)
  - [x] 문제 접근 방식
  - [ ] 정보전달(deploy)