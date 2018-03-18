webpackJsonp([64644745495923],{"./node_modules/json-loader/index.js!./.cache/json/steps-2017-12-03-pattern-matching-intro.json":function(e,a){e.exports={data:{post:{html:'<h2 id="pattern-matching--switch"><a href="#pattern-matching--switch" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Pattern Matching / Switch</h2>\n<p>Consider the factorial function from the <a href="https://codekiln.github.io/gradus-reason/steps/2017-11-19--names-and-functions/">last post</a>:</p>\n<div class="gatsby-highlight">\n        <pre class="language-reason"><code>let rec factorial = (a) =>\n  a === 1 ? 1 : a * factorial(a - 1);\n\nfor (i in 1 to 4) {\n  Js.log(factorial(i))\n};</code></pre>\n        </div>\n<p>While an if/else or ternary expression works just fine for two branches, there is another way to express this\nin Reason using a <a href="https://reasonml.github.io/guide/language/pattern-matching/#usage"><code>switch statement</code></a>:</p>\n<div class="gatsby-highlight">\n        <pre class="language-reason"><code>let rec factorial = (a) =>\n  switch a {\n  | 1 => 1\n  | _ => a * factorial (a - 1)\n  };\n\nJs.log(factorial(4));</code></pre>\n        </div>\n<p>As you can see, the final case of the <code>switch</code> can be <code>_</code>, which is Reason OCaml\'s\nsyntax for a throwaway variable.</p>\n<p>Continuing also from the <a href="https://codekiln.github.io/gradus-reason/steps/2017-11-19--names-and-functions/">last post</a>,\nconsider the function we wrote to determine if a character is a vowel:</p>\n<div class="gatsby-highlight">\n        <pre class="language-reason"><code>let isvowel = (c) =>\n  c === \'a\' || c === \'e\' || c === \'i\' || c === \'o\' || c === \'u\';\n\nJs.log(isvowel(\'a\'));\nJs.log(isvowel(\'b\'));</code></pre>\n        </div>\n<p>Let\'s convert this to using the switch statement:</p>\n<div class="gatsby-highlight">\n        <pre class="language-reason"><code>let isVowel = (c) =>\n  switch c {\n  | \'a\' => true\n  | \'e\' => true\n  | \'i\' => true\n  | \'o\' => true\n  | \'u\' => true\n  | _ => false\n  };\n  \nlet myWord = "mississippi";\n\nfor (i in 0 to String.length(myWord) - 1) {\n  let c = myWord.[i];\n  let cString = String.make(1, c) ++ ": is vowel? ";\n  Js.log(cString ++ string_of_bool(isVowel(c)));\n}</code></pre>\n        </div>\n<p>Here I\'ve also used the <a href="https://reasonml.github.io/api/String.html"><code>String.make</code></a> function, which can\nmake a string from a char.</p>\n<p>Consider the <a href="https://en.wikipedia.org/wiki/Fibonacci_number">Fibonacci series</a>,\n<code>1, 1, 2, 3, 5, 8, 13...</code>, where each number is the sum of the prior two numbers.\nTo write a function that gives the _n_th Fibonacci number, one can use of pattern matching.\nThis shows that one doesn\'t need to discard the default case and can reuse it as a variable\nin a subsequent function call:</p>\n<div class="gatsby-highlight">\n        <pre class="language-reason"><code>let rec fib = (n) => {\n  switch n {\n  | 0 => 0\n  | 1 => 1\n  | n => fib(n-2) + fib(n-1)\n  };\n};\n\nfor (i in 1 to 10) {\n  Js.log(fib(i))\n};</code></pre>\n        </div>\n<h2 id="variants--synonyms"><a href="#variants--synonyms" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Variants / Synonyms</h2>\n<p>The complement of pattern matching is <a href="https://reasonml.github.io/guide/language/variant">variants</a>.\nVariants are synonyms or equivalence classes that are constructed with the single bar character: (<code>|</code>) </p>\n<div class="gatsby-highlight">\n        <pre class="language-reason"><code>let scrabbleLetterScore = (c) => {\n  switch c {\n  | (\'a\' | \'e\' | \'i\' | \'o\' | \'u\' | \'l\' | \'n\' | \'s\' | \'t\') => 1\n  | (\'d\' | \'g\') => 2\n  | (\'b\' | \'c\' | \'m\' | \'p\') => 3\n  | (\'f\' | \'h\' | \'v\' | \'w\' | \'y\') => 4\n  | \'k\' => 5\n  | (\'j\' | \'x\') => 8\n  | (\'q\' | \'z\') => 10\n  | _ => 0\n  };\n};\nJs.log(scrabbleLetterScore(\'q\'))</code></pre>\n        </div>\n<p>Both pattern matching and variants are much more important to Reason than we\'ve let on here.\nBefore we touch on that we need to introduce more data structures. Hopefully this post gives\na taste of what it\'s like to use <code>switch</code> to do make clear code paths.</p>\n<h2 id="pattern-matching-with-arrays"><a href="#pattern-matching-with-arrays" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Pattern Matching with Arrays</h2>\n<div class="gatsby-highlight">\n        <pre class="language-reason"><code>let myArr = [|1, 2, 3, 4|];\nlet myArr2 = [||];\nlet myArr3 = [|"dog", "cat"|];\n\nlet processArr =\n  fun\n  | [||] => "empty"\n  | [|_|] => "one"\n  | [|_, _|] => "two"\n  | _ => "many";\n\nJs.log(processArr(myArr));\nJs.log(processArr(myArr2));\nJs.log(processArr(myArr3));</code></pre>\n        </div>\n<p>This example is powered by a <a href="https://reasonml.github.io/docs/en/comparison-to-ocaml.html#single-argument-match-functions">Single Argument Match Function</a>.</p>\n<h2 id="explorations"><a href="#explorations" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Explorations</h2>\n<p>Use pattern matching to write a function that ...</p>\n<ol>\n<li>returns the sum of integers 1 through <em>n</em></li>\n<li>computes <em>x</em> to the power of <em>n</em></li>\n</ol>\n<h2 id="links"><a href="#links" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Links</h2>\n<ol>\n<li>Dr. Axel Rauschmayer has written an extensive post on this topic,\n<a href="http://2ality.com/2017/12/pattern-matching-reasonml.html"><em>Pattern matching in ReasonML: destructuring, switch, if expressions</em></a></li>\n</ol>\n<p>Image Credit: <a href="https://www.flickr.com/photos/nigelappleton/1464768432/in/photolist-3erjC9-PTSC9K-4nJkdk-n5aMvJ-3gHgr3-R8vP8v-EcfmZ8-9xykkt-8aNEsQ-8Cm7Ds-qoqvAX-98kGGt-8ZgtEA-pq7JYs-qV78yB-QyhbF1-QUmEbW-TYaiKG-5Nku1X-3KGy9w-PRa3Fh-QWYhSP-4Gmc7R-djCNth-PTTz7v-QWYf3F-5LPGCh-XFcT4N-aa7itJ-boqf9z-qaDy2n-PRai3y-6MfKzG-sn4PAc-PRbEih-e4haW1-p6YGQ-f4hQxr-nBveGm-4fuunE-9xWtdU-PTU3jX-EvivH-9z4MMk-9xWsCC-9bQW8-zBV5G-4Gy1QA-8Zf2o6-QWWZDT"><em>Wall</em> by Nigel Appleton on Flickr</a></p>\n<p><em><a href="https://github.com/codekiln/gradus-reason/tree/master/data/steps/2017-12-03--pattern-matching-intro/index.md">Edit this post here</a></em></p>',excerpt:"Pattern Matching / Switch Consider the factorial function from the  last post : While an if/else or ternary expression works just fine for…",timeToRead:4,fields:{slug:"/steps/2017-12-03--pattern-matching-intro/"},frontmatter:{tags:["pattern-matching","variants"],author:{id:"Myer Nore",bio:"",twitter:"@MyerNore",avatar:{children:[{responsiveResolution:{src:"/static/eebd74c7dad24cbd53ab5eee2861fe0b-03c1e.jpg",srcSet:"/static/eebd74c7dad24cbd53ab5eee2861fe0b-03c1e.jpg 1x,\n/static/eebd74c7dad24cbd53ab5eee2861fe0b-95a48.jpg 1.5x,\n/static/eebd74c7dad24cbd53ab5eee2861fe0b-cc0c5.jpg 2x"}}]}},title:"Pattern Matching Intro",updatedDate:"Dec 3, 2017",image:{children:[{responsiveResolution:{src:"/static/b33a113fe6b211a622e467f2a680a941-936ba.jpg",srcSet:"/static/b33a113fe6b211a622e467f2a680a941-936ba.jpg 1x,\n/static/b33a113fe6b211a622e467f2a680a941-1afa9.jpg 1.5x,\n/static/b33a113fe6b211a622e467f2a680a941-e5a09.jpg 2x,\n/static/b33a113fe6b211a622e467f2a680a941-25bb3.jpg 3x"}}]}}},recents:{edges:[{node:{fields:{slug:"/steps/2018-03-14--modules/"},timeToRead:6,frontmatter:{title:"Modules",image:{children:[{responsiveResolution:{src:"/static/4b207212da2130c54d5d3f3c6852486b-7f526.jpg",srcSet:"/static/4b207212da2130c54d5d3f3c6852486b-7f526.jpg 1x,\n/static/4b207212da2130c54d5d3f3c6852486b-12b36.jpg 1.5x,\n/static/4b207212da2130c54d5d3f3c6852486b-f59e5.jpg 2x,\n/static/4b207212da2130c54d5d3f3c6852486b-4704a.jpg 3x"}}]},author:{id:"Myer Nore",avatar:{children:[{responsiveResolution:{src:"/static/eebd74c7dad24cbd53ab5eee2861fe0b-a469f.jpg",srcSet:"/static/eebd74c7dad24cbd53ab5eee2861fe0b-a469f.jpg 1x,\n/static/eebd74c7dad24cbd53ab5eee2861fe0b-e6d15.jpg 1.5x,\n/static/eebd74c7dad24cbd53ab5eee2861fe0b-b974e.jpg 2x,\n/static/eebd74c7dad24cbd53ab5eee2861fe0b-89580.jpg 3x"}}]}}}}},{node:{fields:{slug:"/steps/2018-03-06--maps/"},timeToRead:5,frontmatter:{title:"Maps",image:{children:[{responsiveResolution:{src:"/static/502660d3a6174f3c7a7553e0a1b971c9-7f526.jpg",srcSet:"/static/502660d3a6174f3c7a7553e0a1b971c9-7f526.jpg 1x,\n/static/502660d3a6174f3c7a7553e0a1b971c9-12b36.jpg 1.5x,\n/static/502660d3a6174f3c7a7553e0a1b971c9-f59e5.jpg 2x,\n/static/502660d3a6174f3c7a7553e0a1b971c9-4704a.jpg 3x"}}]},author:{id:"Myer Nore",avatar:{children:[{responsiveResolution:{src:"/static/eebd74c7dad24cbd53ab5eee2861fe0b-a469f.jpg",srcSet:"/static/eebd74c7dad24cbd53ab5eee2861fe0b-a469f.jpg 1x,\n/static/eebd74c7dad24cbd53ab5eee2861fe0b-e6d15.jpg 1.5x,\n/static/eebd74c7dad24cbd53ab5eee2861fe0b-b974e.jpg 2x,\n/static/eebd74c7dad24cbd53ab5eee2861fe0b-89580.jpg 3x"}}]}}}}},{node:{fields:{slug:"/steps/2018-03-02--objects/"},timeToRead:2,frontmatter:{title:"Objects",image:{children:[{responsiveResolution:{src:"/static/0a992d200e8146e849bd5350b9256aee-7f526.jpg",srcSet:"/static/0a992d200e8146e849bd5350b9256aee-7f526.jpg 1x,\n/static/0a992d200e8146e849bd5350b9256aee-12b36.jpg 1.5x,\n/static/0a992d200e8146e849bd5350b9256aee-f59e5.jpg 2x,\n/static/0a992d200e8146e849bd5350b9256aee-4704a.jpg 3x"}}]},author:{id:"Myer Nore",avatar:{children:[{responsiveResolution:{src:"/static/eebd74c7dad24cbd53ab5eee2861fe0b-a469f.jpg",srcSet:"/static/eebd74c7dad24cbd53ab5eee2861fe0b-a469f.jpg 1x,\n/static/eebd74c7dad24cbd53ab5eee2861fe0b-e6d15.jpg 1.5x,\n/static/eebd74c7dad24cbd53ab5eee2861fe0b-b974e.jpg 2x,\n/static/eebd74c7dad24cbd53ab5eee2861fe0b-89580.jpg 3x"}}]}}}}},{node:{fields:{slug:"/steps/2018-02-25--variants/"},timeToRead:5,frontmatter:{title:"Variants",image:{children:[{responsiveResolution:{src:"/static/5dc86a763411f112f6bc01857ef6b383-7f526.jpg",srcSet:"/static/5dc86a763411f112f6bc01857ef6b383-7f526.jpg 1x,\n/static/5dc86a763411f112f6bc01857ef6b383-12b36.jpg 1.5x,\n/static/5dc86a763411f112f6bc01857ef6b383-f59e5.jpg 2x,\n/static/5dc86a763411f112f6bc01857ef6b383-4704a.jpg 3x"}}]},author:{id:"Myer Nore",avatar:{children:[{responsiveResolution:{src:"/static/eebd74c7dad24cbd53ab5eee2861fe0b-a469f.jpg",srcSet:"/static/eebd74c7dad24cbd53ab5eee2861fe0b-a469f.jpg 1x,\n/static/eebd74c7dad24cbd53ab5eee2861fe0b-e6d15.jpg 1.5x,\n/static/eebd74c7dad24cbd53ab5eee2861fe0b-b974e.jpg 2x,\n/static/eebd74c7dad24cbd53ab5eee2861fe0b-89580.jpg 3x"}}]}}}}}]}},pathContext:{slug:"/steps/2017-12-03--pattern-matching-intro/"}}}});
//# sourceMappingURL=path---steps-2017-12-03-pattern-matching-intro-276f56077b733c3e72ee.js.map