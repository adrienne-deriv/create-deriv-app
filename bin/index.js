#!/usr/bin/env node
import k from"path";import{fileURLToPath as Y}from"url";var H=Y(import.meta.url),K=k.dirname(H),X=process.env.npm_lifecycle_event==="dev",d=process.cwd(),Z=k.join(K,X?"../src":"../bin"),I=k.join(Z,"templates"),O=["     ____  __________  _____    __    __   ______ ","    / __ / ____/ __ / // /|  / / /   |  / / __   /","   / / / / __/ / /_/ // / | | / /____| | / /__/ / ","  / /_/ / /___/ _, _// /  | |/ /_____/ |/ // __/  "," /_____/_____/_/ |_/___/  |___/      |___//____/  "].join(`
`);import J from"fs-extra";import T from"path";import C from"chalk";var g=e=>console.log(C.cyan(e)),f=e=>console.log(C.red(e));var $=e=>{let t=T.join(d,e);J.existsSync(t)?(f(`The package ${e} already exists!`),process.exit(1)):J.mkdirSync(T.join(d,e))};import*as n from"@clack/prompts";import ee from"fs-extra";import te from"path";var re=e=>{if(!e.length)return"A package name is required";if(ee.existsSync(te.join(d,e)))return`The package folder ${e} already exists`},R=async()=>{let e=await n.text({message:"What is the name of the new V2 package? (should be the same name as the Github repository)",validate:re});if(await n.confirm({message:"Is this for a library?",initialValue:!1})){let p=await n.text({message:"Provide a short description of the library",validate(w){if(w.length===0)return"A description is required"}}),c=await n.text({message:"Provide the Github organization name owning this library",initialValue:"deriv-com"}),h=await n.text({message:`Provide the Github repository name for the library (found at https://github.com/${c.toString()}/<REPOSITORY_NAME>)`,validate(w){if(w.length===0)return"A repository name is required"}}),M=`https://github.com/${c}/${e.toString()}`,Q=await n.confirm({message:"Should we initialize a Git repository and bootstrap the package?",initialValue:!0});return{name:e.toString(),description:p.toString(),repository:M.toString(),organizationName:c.toString(),repositoryName:h.toString(),type:"library",shouldBootstrap:!!Q}}let r=await n.group({bundler:()=>n.select({message:"Which bundler would you like to integrate?",options:[{value:"vite",label:"Vite"},{value:"rsbuild",label:"Rsbuild"}],initialValue:"webpack"}),styling:()=>n.select({message:"Which styling library will you be using?",options:[{value:"tailwind",label:"Tailwind",hint:"includes twMerge and clsx"},{value:"sass",label:"Sass",hint:"includes clsx"},{value:"styledComponents",label:"Styled Components"}],initialValue:"tailwind"}),derivPackages:()=>n.multiselect({message:"Which Deriv packages should be included?",options:[{value:"derivUi",label:"@deriv/ui"},{value:"derivUtils",label:"@deriv/utils"},{value:"derivIcons",label:"@deriv/quill-icons"}]})},{onCancel:()=>process.exit(1)}),i=await n.confirm({message:"Do you want to configure the folder structure?",initialValue:!0}),s;i&&(s=await n.multiselect({message:"Which folder structures should we bootstrap for you?",options:[{value:"components",label:"components",hint:"at src/components"},{value:"pages",label:"pages",hint:"at src/pages"},{value:"screens",label:"screens",hint:"at src/screens"},{value:"hooks",label:"hooks",hint:"at src/hooks"},{value:"utils",label:"utils",hint:"at src/utils"}]}));let l,m=await n.confirm({message:"Should we initialize a Git repository and bootstrap the package?",initialValue:!0});return{name:e.toString(),type:"package",...r,shouldBootstrap:!!m,aliases:l,folders:s}};import z from"fs-extra";import{join as ie}from"path";var o=({packagePath:e,dependencies:t,devDependencies:r,scripts:i,name:s,description:l,repositoryUrl:m})=>{let S=ie(e,"package.json"),p=z.readJSONSync(S);if(t)for(let[c,h]of Object.entries(t))p.dependencies[c]=h;if(r)for(let[c,h]of Object.entries(r))p.devDependencies[c]=h;i&&Object.keys(i).forEach(c=>p.scripts[c]=i[c]),s&&(p.name=s),l&&(p.description=l),m&&(p.repository={url:m},p.homepage=`${m}#readme`,p.bugs={url:`${m}/issues`}),z.writeJSONSync(S,p,{spaces:2})};import Re from"fs-extra";import{exec as oe}from"child_process";import ne from"util";import{spinner as se}from"@clack/prompts";var v=ne.promisify(oe);async function N(e,t){let r=se();try{r.start("Initializing Git repository"),await v(`cd ${e} && git init`),t.type==="library"&&await v(`git remote add upstream git@github.com:${t.organizationName}/${t.repositoryName}.git`),r.message("Bootstrapping dependencies (this might take some time \u{1F61B})"),await v(`cd ${e} && npm install`),r.message("Preparing precommit hooks"),await v(`cd ${e} && npm run prepare`),t.type==="library"&&(r.message("Setting up development branch for pre-release"),await v("git checkout -b development")),r.stop()}catch(i){console.log(i),r.stop("There was an error in bootstrapping the package")}}import{join as B}from"path";import ae from"fs-extra";function a(e,t){let r=B(I,t),i=B(d,e)+"/";ae.copySync(r,i,{overwrite:!0})}var u=(e,t)=>{a(e,t?"libraryLinters":"linters"),o({packagePath:e,devDependencies:t?{"@deriv-com/eslint-config-deriv":"^2.1.0-beta.3","eslint-plugin-prettier":"^5.0.0",prettier:"^3.1.0"}:{"@deriv-com/eslint-config-deriv":"^2.1.0-beta.3","eslint-plugin-prettier":"^5.0.0",stylelint:"^13.13.1","stylelint-config-prettier":"^8.0.2","stylelint-formatter-pretty":"^2.1.1","stylelint-no-unsupported-browser-features":"^4.0.0","stylelint-selector-bem-pattern":"^2.1.0",prettier:"^3.1.0"},scripts:{"test:lint":'prettier --log-level silent --write . && eslint "./src/**/*.?(js|jsx|ts|tsx)"'}})};var y=e=>{o({packagePath:e,devDependencies:{"lint-staged":"^10.4.0",husky:"^7.0.0","@commitlint/cli":"^17.1.2","@commitlint/config-conventional":"^17.1.0","@commitlint/config-nx-scopes":"^17.0.0"},scripts:{prepare:"husky install"}}),a(e,"husky")};var _=e=>{o({packagePath:e,devDependencies:{jest:"^29.7.0","jest-environment-jsdom":"^29.7.0","jest-transformer-svg":"^2.0.2","@testing-library/jest-dom":"^6.4.2","@testing-library/react":"^14.2.1","@testing-library/user-event":"^14.5.2","@types/jest":"^29.5.12","identity-obj-proxy":"^3.0.0","ts-jest":"^29.1.2"}}),a(e,"jest")};var L=e=>{a(e,"rsbuild"),a(e,"actions"),u(e,!1),y(e),_(e),o({packagePath:e,name:e})};var A=e=>{o({packagePath:e,dependencies:{clsx:"^2.1.0"},devDependencies:{sass:"^1.70.0"}})};var E=e=>{o({packagePath:e,dependencies:{clsx:"^2.1.0","tailwind-merge":"^2.2.1"},devDependencies:{tailwindcss:"^3.3.5",autoprefixer:"^10.4.14",postcss:"^8.4.31",prettier:"^3.1.0","prettier-plugin-tailwindcss":"^0.5.7"}}),a(e,"tailwind")};import{parse as le}from"@babel/parser";import pe from"@babel/traverse";import ce from"@babel/generator";import P from"fs-extra";import{join as me}from"path";async function j({packagePath:e,organizationName:t}){let r=me(e,"release.config.cjs");if(!P.existsSync(r))throw new Error("release.config.cjs does not exist within the package folder.");let i=P.readFileSync(r,"utf-8"),s=await le(i);await pe.default(s,{ObjectProperty:function(m){m.node.key?.name==="repositoryUrl"&&(m.node.value.value=`git@github.com:${t}/${e}.git`)}});let l=await ce.default(s);P.writeFileSync(r,l.code,"utf-8")}var V=(e,t)=>{a(e,"tsup"),u(e,!0),y(e),j({packagePath:e,organizationName:t.organizationName}),o({packagePath:e,name:t.name,description:t.description,repositoryUrl:t.repository,devDependencies:{"@semantic-release/changelog":"^6.0.3","@semantic-release/github":"^9.2.6","@semantic-release/npm":"^11.0.3","@semantic-release/release-notes-generator":"^12.1.0"}})};var U=e=>{a(e,"vite"),a(e,"actions"),u(e,!1),y(e),_(e),o({packagePath:e,name:e})};var G=e=>{o({packagePath:e,dependencies:{"styled-components":"^6.1.8"}})};var de={derivUi:{dependency:"@deriv-com/ui",version:"latest"},derivUtils:{dependency:"@deriv-com/utils",version:"latest"},derivIcons:{dependency:"@deriv/quill-icons",version:"latest"}},F=(e,t)=>{let r={};for(let i=0;i<t.length;i++){let s=de[t[i]];r[s.dependency]=s.version}o({packagePath:e,dependencies:r})};import fe from"gradient-string";import b from"chalk";import D from"boxen";import{join as ge}from"path";import x from"fs-extra";var q=(e,t)=>{let r=ge(d,e);for(let i=0;i<t.length;i++){let s=`${r}/src/${t[i]}`;if(!x.existsSync(s)){x.mkdirSync(s);try{let l=x.openSync(`${s}/index.ts`,"wx");x.closeSync(l)}catch{continue}}}};var W=(e,t)=>{let r=s=>s.map(l=>b.bold("\u279C")+`  ${l}`).join(`
`),i=r(["git init","npm install","npm run prepare"]);g(b.bold(`Navigate to ${e} folder and run the following commands:`)),g(D(b.bold("\u279C")+`  cd ${e}
`+(t.shouldBootstrap?"":i),{padding:2,borderStyle:"none"})),g(b.bold("To start the development server:")),g(D(b.bold("\u279C")+"  npm run dev",{padding:2,borderStyle:"none"})),t.type==="library"&&(g(b.bold("To commit and publish for a pre-release version (e.g. 1.0.0-development.1):")),g(D(r(["git checkout -b development","git add .",'git commit -m "feat: initialized repository for library"',"git push upstream development"]),{padding:2,borderStyle:"none"})))},ue=async()=>{let e=fe("#b62020","#fe8181");console.log(e.multiline(O)),console.log(`
`);let t=await R(),r=String(t.name);if($(r),t.type==="library"){V(r,t),t.shouldBootstrap&&await N(r,t),W(r,t);return}switch(t.bundler){case"vite":U(r);break;case"rsbuild":L(r);break;default:break}switch(t.styling){case"tailwind":E(r);break;case"sass":A(r);break;case"styledComponents":G(r);break;default:break}t.derivPackages.length&&F(r,t.derivPackages),t.folders&&q(r,t.folders),t.shouldBootstrap&&await N(r,t),W(r,t)};ue().catch(e=>{f("Aborting installation..."),e instanceof Error?f(e.message):(f("An unknown error has occurred:"),console.log(e)),process.exit(1)});
//# sourceMappingURL=index.js.map