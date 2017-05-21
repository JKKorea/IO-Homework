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

# 기능
  >+ 트랜잭션 정보 조회(요구사항1)
  >+ 트랜잭션 out정보 조회(요구사항2) -> console
  >+ Create My Wallet -> bitcore-lib 사용
  >+ BTC USD Converter -> bitcore-lib 사용

# 진행사항
  - [x] 기능구현
  - [x] console -> web
  - [ ] TDD (Mocha)
  - [ ] 모듈화
  - [ ] 문제 접근 방식
  - [ ] 정보전달(deploy)