const assert = require('assert')

const range = function(start, end, fn) {
  for (let i = 0, v = start, incr = (start < end ? 1 : -1); v != end; v += incr) {
    fn(v, i++)
  }
}

// all possible values for varint7 given its range [-2^(N-1), +2^(N-1)-1]  N=7
const valueTable = {
  '-64':64,'-63':65,'-62':66,'-61':67,'-60':68,'-59':69,'-58':70,'-57':71,'-56':72,'-55':73,
  '-54':74,'-53':75,'-52':76,'-51':77,'-50':78,'-49':79,'-48':80,'-47':81,'-46':82,'-45':83,
  '-44':84,'-43':85,'-42':86,'-41':87,'-40':88,'-39':89,'-38':90,'-37':91,'-36':92,'-35':93,
  '-34':94,'-33':95,'-32':96,'-31':97,'-30':98,'-29':99,'-28':100,'-27':101,'-26':102,'-25':103,
  '-24':104,'-23':105,'-22':106,'-21':107,'-20':108,'-19':109,'-18':110,'-17':111,'-16':112,
  '-15':113,'-14':114,'-13':115,'-12':116,'-11':117,'-10':118,'-9':119,'-8':120,'-7':121,
  '-6':122,'-5':123,'-4':124,'-3':125,'-2':126,'-1':127,0:0,1:1,2:2,3:3,4:4,5:5,
  6:6,7:7,8:8,9:9,10:10,11:11,12:12,13:13,14:14,15:15,16:16,17:17,
  18:18,19:19,20:20,21:21,22:22,23:23,24:24,25:25,26:26,27:27,28:28,
  29:29,30:30,31:31,32:32,33:33,34:34,35:35,36:36,37:37,38:38,39:39,
  40:40,41:41,42:42,43:43,44:44,45:45,46:46,47:47,48:48,49:49,50:50,
  51:51,52:52,53:53,54:54,55:55,56:56,57:57,58:58,59:59,60:60,61:61,
  62:62,63:63
}

const VarInt7 = function(value) {
  assert(value >= -64 && value <= 63)
  return value < 0 ? (128 + value) : value
}

const ReadVarInt7 = function(byte) {
  return byte < 64 ? byte : -(128 - byte)
}

range(-64, 64, v => {
  let byte = VarInt7(v)
  // console.log(`${v} : ${byte}`)
  assert.equal(byte, valueTable[v])
  let value = ReadVarInt7(byte)
  assert.equal(value, v)
})