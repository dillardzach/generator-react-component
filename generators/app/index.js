'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');

function pascalToSnake(s){
	return s
		.replace(/(?:^|\.?)([A-Z])/g, function (x,y){
			return "_" + y.toLowerCase()
		})
		.replace(/^_/, "")
}

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // This makes `appname` a required argument.
    this.argument("name", { type: String, required: true });
		this.option("common")

    // And you can then access it later; e.g.
    this.log(this.options.name);
    this.log(this.options.common);
  }

	/*prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the legendary ${chalk.red('generator-react-scss-component')} generator!`)
    );

    const prompts = [
			      {
        type: "input",
        name: "name",
        message: "What is the name of the component ?",
				default: 'NewComponent' //this.appname // Default to current folder name
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
	}*/

	writing() {
		/* Setting up variables */
		const { name, common } = this.options
		const folder = common ? './' : './' + name  +'/'
		const lower = pascalToSnake(name)
		const scss = lower + '.scss'

		/* Making the new folder */
		if (!common) mkdirp.sync(name)
		this.destinationRoot(folder);
		
		/* Copying */
		if(!common) this.fs.copyTpl(
			this.templatePath('index.js'),
			this.destinationPath('index.js'),
      { name  }
    );

		this.fs.copyTpl(
			this.templatePath('component.scss'),
			this.destinationPath(pascalToSnake(scss)),
				{ name }
    );

		this.fs.copyTpl(
			this.templatePath('Component.js'),
			this.destinationPath(name + '.js'),
			{ 
				name,
				scss,
				lower,
			}
    );

  }

  install() {
		//this.installDependencies();
  }
};
