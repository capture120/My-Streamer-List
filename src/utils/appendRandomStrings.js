function appendRandomStrings(str) {
  const arr = [];
  for (let i = 0; i < 10; i++) {
    // toString(36) for full alphabet and numbers 0-9
    let randomString = Math.random().toString(10).substring(2, 5);
    arr.push(str + randomString);
  }
  // const a = randString("hi");
  // message = JSON.stringify(a, null, 2)
  return arr;
}