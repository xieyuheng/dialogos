const { __PRODUCTION__ } = process.env

export const web = {
  url: __PRODUCTION__
    ? "http://vmi436272.contaboserver.net"
    : "http://localhost:5000",
}
