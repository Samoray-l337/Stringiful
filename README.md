# Stringiful

![npm](https://img.shields.io/npm/v/stringiful?color=blue)
![npm](https://img.shields.io/npm/l/stringiful?color=blue)
![npm](https://img.shields.io/npm/dt/stringiful?color=blue)


<p>
    <span style="background-color: #ca5010; color: white; padding: 5px; font-size: 20px; border-radius: 5px" >Warning - This is a Beta version</span>
</p>
<br>


<br />
<p align="center">
  <a href="https://github.com/Samoray-l337/Stringiful">
    <img src="https://github.com/Samoray-l337/Stringiful/blob/master/other/logo.png" alt="Stringiful Logo" width="256px" height="256px">
  </a>

  <h3 align="center">Stringiful</h3>

  <p align="center">
    Stringify anything with powerful and configurable formatters.
    <br />
    <br />
    ·
    <a href="https://github.com/Samoray-l337/Stringiful/issues">Report a Bug or Request a Feature</a>
    ·
  </p>
</p>

#

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 sty le="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#examples">Examples</a></li>
      </ul>
    </li>
    <li>
      <a href="#documentation">Documentation</a>
      <ul>
        <li><a href="#stringify">stringify</a></li>
        <li><a href="#create-stringify-function">createStringifyFunction</a></li>
        <li><a href="#formatters-configuration">Formatters configuration</a></li>
        <li><a href="#parse">parse</a></li>
      </ul>
    </li>
    <li>
      <a href="#interfaces">Interfaces</a>
      <ul>
        <li><a href="#IStringifyOptions">IStringifyOptions</a></li>
        <li><a href="#IFormatterConfig">IFormatterConfig</a></li>
        <li><a href="#InspectOptions">InspectOptions</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
#

## About The Project

Stringiful gives an easy to use stringify function with built-in formatters and extendable configurations that will match every need.

Stringiful uses at its core NodeJS native module [util.inspect](https://nodejs.org/api/util.html#util_util_inspect_object_options), for colorful and amazing strings representations of any Object.

Stringiful supports also circular objects.

(note: colors are not supported on every shell, you should check if your terminal support ansi colors before using {colors: true} option)

#

## Getting started

### Prerequisites

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

-   npm
    ```bash
    npm install stringiful
    ```

#

### Examples

#### simple use example
```ts
import { stringify } from 'stringiful';

const nestedObject = {
  a: { b: ['123', '456', new Date()], c: { d: '12323'}, e: 'testing'}
};

console.log(stringify(nestedObject));
```

#

#### colorful and compact output example
```ts
import { stringify, IStringifyOptions } from 'stringiful';

const nestedObject = {
  a: { b: ['123', '456', new Date()], c: { d: '12323'}, e: 'testing'}
};

const options: IStringifyOptions = { InspectOptions: { compact: true, colors: true }}

console.log(stringify(nestedObject, options));
```

#

#### change the default formatters parameters
```ts
import { stringify, IStringifyOptions } from 'stringiful';

const testObject = {
  a: { b: ['long string examples', 'as', new Date()], c: 'aa'}
};

const options: IStringifyOptions = {
    formatters: [
        { matches: 'string', params: { maxLength: 5 } }, // limit strings to length 5
        { matches: 'date', params: { timezone: 'Australia/Perth' } }, // change timezones of dates to Australia/Perth
    ],
    inspectOptions: {
        colors: true,
        depth: null
    },
};

console.log(stringify(testObject, options));

// outputs:
// { a: { b: [ 'long ...', 'as', 2021-04-16T16:50:37.000Z ], c: 'aa' } }
```

#

#### add new custom formatter
```ts
import { stringify, IStringifyOptions } from 'stringiful';

const testObject = {
  a: { b: ['long string examples', 'as', new Date()], c: { d: 'aa' }}
};

const options: IStringifyOptions = {
    formatters: [
        { matches: 'string', params: { maxLength: 5 } }, // limit strings to length 5
        {
            matches: (obj: any) => obj.d === 'aa',
            format: (obj: any) => {
                return { d: `---${obj.d}---` };
            },
        },
    ],
    inspectOptions: {
      colors: true,
      depth: null
    },
};

console.log(stringify(testObject, options));

// outputs:
//  a: {
//    b: [ 'long ...', 'as', 2021-04-16T11:56:57.000Z ],
//    c: { d: '---aa---' } // the formatted string is not limited to length 5 because of the custom formatter
//  }
```

#

#### for multiple time uses, create a stringify function with specefic options, which is also more efficient
```ts
import { createStringifyFunction, IStringifyOptions } from 'stringiful';

const testObject = {
  a: { b: ['long string examples', 'as', new Date()], c: { d: 'aa' }}
};

const testObject2 = {
  a: { d: 'aa', c: { d: 'aa' }}
};

const options: IStringifyOptions = {
    formatters: [
        { matches: 'string', params: { maxLength: 5 } }, // limit strings to length 5
        {
            matches: (obj: any) => obj.d === 'aa',
            format: (obj: any) => {
                return { d: `---${obj.d}---` };
            },
        },
    ],
    inspectOptions: {
      colors: true,
      depth: null
    },
};

const myAwesomeStringify = createStringifyFunction(options);
console.leg(myAwesomeStringify(testObject));
console.leg(myAwesomeStringify(testObject2));

// outputs:
//  a: {
//    b: [ 'long ...', 'as', 2021-04-16T11:56:57.000Z ],
//    c: { d: '---aa---' } // the formatted string is not limited to length 5 because of the custom formatter
//  }

//  a: { d: '---aa---', c: { d: '---aa---'} }

```

#

## Documentation

### stringify

The main function of stringiful package, this is where all the magic happens.

the function will get any Object (with couple of options) and return the beautiful string representation of it.

It will also format the object as you wish using generic formatters configurations and couple of amazing default ones to.

look at the configuration here: <a href="#interfaces">Interfaces</a>

#

### Create Stringify Function

if your'e using stringify function couple of times using the same (or almost same) configuration, you are doing it wrong.
you should use createStringifyFunction() that takes your configuration once and returns stringify function that you can use couple of times.

(note: you cant override the configuration after you created the function)
(btw: this is much more efficient because the formatters are created only one time and the function will reuse them)

#
### Formatters configuration

Stringiful supports couple of built-in formatters that you could configure as you wish

#### matches: 'string'

simple string formatter that will identify strings and limit their length

```ts
const params?: {
    maxLength?: number;
};
```

#
#### matches: 'axiosError'

simple axiosError formatter that will identify axios errors and filter their fields for simplified output.
You can also configure the maximum response and request data length

```ts
const params?: {
    maxResponseDataLength?: number;
    maxRequestDataLength?: number;
};
```
#
#### matches: 'date'

simple date formatter that will identify dates and convert them to your prefered timezone and locale.

```ts
const params?: {
    timezone?: AllowedTimezone;
    locale?: string;
};
```

#

### parse

WIP: doesn't implemanted yet

#

## Interfaces

### IStringifyOptions

```ts
interface IStringifyOptions {
    formatters?: IFormatterConfig[];
    inspectOptions?: InspectOptions;
}
```

### IFormatterConfig

```ts
// this is the way of making your custom formatters for your specefic uses
interface IObjectFormatter {
    matches: (obj: any) => boolean; // this is the matches function that will help me find your specefic object and classify (look at the examples)
    format?: (obj: any) => any; // this is the format function, which will change your classified object as you wish
    fieldsWhitelist?: string[]; // you can also provide fieldsWhitelist and Blacklist which will filter fields from your classified object
    fieldsBlacklist?: string[];
}

// this is the way for you to reconfigure my default formatters
interface IDefaultFormatterConfig {
    matches: string; // the name of the type you want to override its config
    // for now its only 'string' | 'axiosError' | 'date',  but many more will be added soon;

    params?: {
        ... // every formatter got his own parameters that you can change (for an example, 'string' type got maxLength param)
    };
    format?: (obj: any) => any; // if you want to, you can override the format function of any formatter with your own formatter.
    // some formatters got also fieldsWhitelist and fieldsBlacklist also that you can change as you wish (as an example: 'axiosError')
    fieldsWhitelist?: string[]; 
    fieldsBlacklist?: string[]; 
}

export interface IFormatterConfig = IObjectFormatter | IDefaultFormatterConfig;
```

### InspectOptions

This is the util.inspect original options,
for more information [util.inspect options](https://nodejs.org/api/util.html#util_util_inspect_object_options)

###

#

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/Samoray-l337/Stringiful/issues) for a list of proposed features (and known issues).

#

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

#

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

#

<!-- CONTACT -->

## Contact

Project Link: [https://github.com/Samoray-l337/Stringiful](https://github.com/Samoray-l337/Stringiful)

#

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Samoray-l337/repo.svg?style=for-the-badge
[contributors-url]: https://github.com/Samoray-l337/repo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Samoray-l337/repo.svg?style=for-the-badge
[forks-url]: https://github.com/Samoray-l337/repo/network/members
[stars-shield]: https://img.shields.io/github/stars/Samoray-l337/repo.svg?style=for-the-badge
[stars-url]: https://github.com/Samoray-l337/repo/stargazers
[issues-shield]: https://img.shields.io/github/issues/Samoray-l337/repo.svg?style=for-the-badge
[issues-url]: https://github.com/Samoray-l337/repo/issues
[license-shield]: https://img.shields.io/github/license/Samoray-l337/repo.svg?style=for-the-badge
[license-url]: https://github.com/Samoray-l337/repo/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/Samoray-l337
