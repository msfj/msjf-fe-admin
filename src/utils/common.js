const Constant = {
  SUCFLAG: 'S',
  FAILFLAG: 'F',
  DFTERMSG: '服务器异常，请稍后重试',
  MSGTM: 60,
};

const Regep = {
  num: /^\d+$/,
  abc: /^[a-zA-Z]+$/,
  certificateno: /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/,
  mobile: /^1[34578]\d{9}$/,
  cardID: /(^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/,
};

export { Constant, Regep };
