let obj = { name: 'zs', age: 10, gender: 'male' }
let { name, age, id } = obj
console.log(name, age, id) //zs 10 undefined
let arr=[]
console.log(arr==false) //true
console.log(arr==0) //true
console.log(arr.length) //0
console.log({}==false)
if(arr){ //空数组也成立
  console.log(100)
}