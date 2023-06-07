import inquirer from "inquirer";
import fs from "fs";

function Decal(logoLetter, textColor, shape, shapeColor) {
    this.logoLetter = logoLetter;
    this.textColor = textColor;
    this.shape = shape;
    this.shapeColor = shapeColor;


    this.generateShape = function () {
        // geneate the shape

        switch (this.shape) {
            case 'circle':
                return `<svg version="1.1" viewBox = "0 0 300 300" xmlns="http://www.w3.org/2000/svg">

        <circle cx="150" cy="100" r="80" fill="${this.shapeColor}" />
      
        <text x="150" y="125" font-size="50" text-anchor="middle" fill="${this.textColor}">${this.logoLetter}</text>
      
      </svg>`;
            case 'triangle':
                return `<svg version ="1.1" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                <polygon points ="250,60 100,400 400,400" class="triangle" fill="${this.shapeColor}" />

                <text x="150" y="150" font-size="50" text-anchor="middle" fill="${this.textColor}">${this.logoLetter}</text>
                </svg>`;

            case 'square':
                return `<svg version ="1.1" viewBox = "0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                <rect width="300" height="300" fill="${this.shapeColor}"/>

                <text x="150" y="150" font-size="50" text-anchor="middle" fill="${this.textColor}">${this.logoLetter}</text>
              </svg>`;
            
            default:
                return"";


        }
    };
};

const questions = [
    {
        type: 'input',
        message: 'What characters would you like on your decal?  You can list up to three.',
        name: 'characters',
      },
      {
        type: 'input',
        message: 'What color would you like your text?',
        name: 'textcolor',
        validate:function (value) { 
           const validColors=[ "red", "green", "blue", "yellow", "violet", "white", "black"];
        if (validColors.includes(value.toLowerCase())){
            return true;
        }
        return "enter color";
        }
      },
      {
        type: 'input',
        message: 'What shape do you want your decal?',
        name: 'shape',
        validate: function (value) {
            const shapes = ["circle", "triangle", "square"];
            if (shapes.includes(value.toLowerCase())){
                return true;
            }
            return "enter shape"
        }
    },
      {
        type: 'input',
        message: 'What color do you want your shape?',
        name: 'shapecolor',
        validate: function (value) {
            const shapes = ["red", "green", "blue", "yellow", "violet"];
            if (shapes.includes(value.toLowerCase())){
                return true;
            }
            return "enter shape color";
        },
    },
];

function writeSvgFile(filePath,svgContent){
    fs.writeFile(filePath, svgContent,(err)=>{
        if(err) {
            console.error("error writing SVG file", err);
        } else {
            console.log("SVG file written");
        }
    });
}


inquirer.prompt(questions)
    .then((responses) => {
    console.log(responses);
    

const lucasShape = new Decal(responses.characters, responses.textcolor, responses.shape, responses.shapecolor);
console.log(lucasShape.generateShape());
    

const svgContent = lucasShape.generateShape();
writeSvgFile('logo.svg', svgContent);
})
.catch((error) => {
    console.error("error prompting:", error);
});
