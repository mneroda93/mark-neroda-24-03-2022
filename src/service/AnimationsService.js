export const animation = (
  <div className="lds-roller">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

const lightGradients = [
  'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
  'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)',
  'linear-gradient(to top, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(to top, #cd9cf2 0%, #f6f3ff 100%)',
  'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)',
]

const darkGradients = [
  'linear-gradient(to top, #30cfd0 0%, #330867 100%)',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)',
  'linear-gradient(to top, #505285 0%, #585e92 12%, #65689f 25%, #7474b0 37%, #7e7ebb 50%, #8389c7 62%, #9795d4 75%, #a2a1dc 87%, #b5aee4 100%)',
  'linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)',
];

export const generateGradients = (light) => {
  const choices = [0,1,2,3,4];
  const rnd = [];
  while (choices.length > 0) {
    const index = Math.floor(Math.random() * choices.length);
    if (light) {
      rnd.push(lightGradients[choices[index]]);
    } else {
      rnd.push(darkGradients[choices[index]])
    }
    choices.splice(index, 1);
  }
  return rnd;
}


