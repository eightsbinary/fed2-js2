(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const R="505f6d75-61e2-46c7-98f0-a4422c9e4b02",b="https://v2.api.noroff.dev",C=`${b}/auth`,A=`${C}/login`,_=`${C}/register`,$=`${b}/social`,f=`${$}/posts`,p=`${$}/profiles`,F="application/json";function i(){const a=new Headers;a.append("X-Noroff-API-Key",R);let e;try{e=d.AuthService.authToken,e&&a.append("Authorization",`Bearer ${e}`)}catch(t){console.error("Error retrieving auth token:",t)}return a.append("Content-Type",F),a}class I{constructor(e,t,o,r,s,n){this.body=e,this.created=t,this.id=o,this.owner=r,this.postId=s,this.replyToId=n}}let v=class{constructor({name:e,email:t,bio:o,banner:r,avatar:s}){this.name=e,this.email=t,this.bio=o,this.banner=r?new S(r):null,this.avatar=s?new S(s):null}};class S{constructor({url:e,alt:t}){this.url=e,this.alt=t}}class k{constructor({followers:e=[],following:t=[]}){this.followers=Array.isArray(e)?e.map(o=>new v(o)):[],this.following=Array.isArray(t)?t.map(o=>new v(o)):[]}}class E{constructor(e,t,o,r,s=[],n,c,h,y,T){this._count=e,this.author=t,this.body=o,this.created=r,this.comments=s,this.id=n,this.media=c,this.tags=h,this.title=y,this.updated=T}}class j{constructor(e=[]){this.posts=e.map(t=>new E(t._count,t.author,t.body,t.created,t.comments,t.id,t.media,t.tags,t.title,t.updated))}}class P{constructor(e={},t={},o={},r=[],s="",n=[],c=[],h="",y=""){this._count=e,this.avatar=t,this.banner=o,this.bio=r,this.email=s,this.followers=n,this.following=c,this.name=h,this.posts=y}}class D{constructor(e=[]){this.profiles=e.map(t=>new P(profile._count,profile.avatar,profile.banner,profile.bio,profile.email,profile.followers,profile.following,profile.name,profile.posts))}}class L{constructor(e,t,o,r,s){this.name=e,this.email=t,this.avatar=o,this.bio=r,this.banner=s}}const l={Comment:I,Follow:k,Post:E,Posts:j,Profile:P,Profiles:D,User:L};class U{async login(e,t){const o=await fetch(`${A}`,{method:"POST",headers:i(),body:JSON.stringify({email:e,password:t})});if(!o.ok)throw new Error("Login Failed");try{const r=await o.json(),{data:s,meta:n}=r;return{success:!0,token:s.accessToken,user:new l.User(s.name,s.email,s.avatar,s.bio,s.banner),meta:n}}catch(r){return{success:!1,message:r.message}}}async register(e,t,o){const r=await fetch(`${_}`,{method:"POST",headers:i(),body:JSON.stringify({name:e,email:t,password:o})});if(!r.ok)throw new Error("Registration failed");try{const s=await r.json(),{data:n,meta:c}=s;return new l.User(n.name,n.email)}catch(s){return{success:!1,message:s.message}}}}const O=new U;class x{async comments(e){const t=`${f}/${e}?_author=true&_comments=true`,o=await fetch(t,{method:"GET",headers:i()});if(!o.ok)throw new Error("Fetching comments failed");try{const r=await o.json(),{data:s,meta:n}=r;return{success:!0,data:new l.Post(s._count,s.author,s.body,s.created,s.comments,s.id,s.media,s.tags,s.title,s.updated),meta:n}}catch(r){return{success:!1,message:r.message}}}async create(e,t){const o=JSON.stringify(t),r=`${f}/${e}/comment`,s=await fetch(r,{method:"POST",headers:i(),body:o});if(!s.ok)throw new Error("Create comments failed");try{const n=await s.json(),{data:c,meta:h}=n;return{success:!0,data:new l.Comment(c.body,c.created,c.id,c.owner,c.postId,c.replyToId),meta:h}}catch(n){return{success:!1,message:n.message}}}async delete(e,t){try{const o=`${f}/${e}/comment/${t}`,r=await fetch(o,{method:"DELETE",headers:i()});if(r.status===204)return{success:!0,message:"Comment deleted successfully."};if(!r.ok){const h=await r.text();throw new Error(`API error: ${r.status} ${r.statusText}. Details: ${h}`)}const s=await r.json(),{data:n,meta:c}=s;return{success:!0,data:new l.Comment(n),meta:c}}catch(o){return{success:!1,message:o.message}}}}const M=new x;class B{async follow(e){const t=await fetch(`${p}/${e}/follow`,{method:"PUT",headers:i()});if(!t.ok)throw new Error("Fetching follow failed");try{const o=await t.json(),{data:r,meta:s}=o;return{success:!0,data:new l.Follow(r),meta:s}}catch(o){return{success:!1,message:o.message}}}async unfollow(e){const t=await fetch(`${p}/${e}/unfollow`,{method:"PUT",headers:i()});if(!t.ok)throw new Error("Fetching unfollow failed");try{const o=await t.json(),{data:r,meta:s}=o;return{success:!0,data:new l.Follow(r),meta:s}}catch(o){return{success:!1,message:o.message}}}async network(e){const t=await fetch(`${p}/${e}?_following=true&_follower=true`,{method:"GET",headers:i()});if(!t.ok)throw new Error("Fetching following failed");try{const o=await t.json(),{data:r,meta:s}=o;return{success:!0,data:new l.Follow(r),meta:s}}catch(o){return{success:!1,message:o.message}}}}const N=new B;class q{async posts(e=1){const t=`${f}?limit=12&page=${e}&_author=true&_comments=true`,o=await fetch(t,{method:"GET",headers:i()});if(!o.ok)throw new Error("Fetching all posts failed");try{const{data:r,meta:s}=await o.json();return{success:!0,data:new l.Posts(r),meta:s}}catch(r){return{success:!1,message:r.message}}}async post(e){const t=`${f}/${e}?_author=true&_comments=true`,o=await fetch(t,{method:"GET",headers:i()});if(!o.ok)throw new Error("Fetching single posts failed");try{const r=await o.json(),{data:s,meta:n}=r;return{success:!0,data:new l.Post(s._count,s.author,s.body,s.created,s.comments,s.id,s.media,s.tags,s.title,s.updated),meta:n}}catch(r){return{success:!1,message:r.message}}}async create(e){const t=JSON.stringify(e),o=`${f}`,r=await fetch(o,{method:"POST",headers:i(),body:t});if(!r.ok)throw new Error("Creating post failed");try{const s=await r.json(),{data:n,meta:c}=s;return{success:!0,data:new l.Post(n._count,n.author,n.body,n.created,n.comments,n.id,n.media,n.tags,n.title,n.updated),meta:c}}catch(s){return{success:!1,message:s.message}}}async update(e,t){const o=JSON.stringify(t),r=`${f}/${e}`,s=await fetch(r,{method:"PUT",headers:i(),body:o});if(!s.ok)throw new Error(`Error: ${s.statusText}`);try{const n=await s.json(),{data:c,meta:h}=n;return{success:!0,data:new l.Post(c._count,c.author,c.body,c.created,c.comments,c.id,c.media,c.tags,c.title,c.updated),meta:h}}catch(n){return{success:!1,message:n.message}}}async delete(e){const t=`${f}/${e}`,o=await fetch(t,{method:"DELETE",headers:i()});if(o.status===204)return{success:!0,message:"Post deleted successfully."};if(!o.ok)throw new Error(`Error: ${o.statusText}`);try{const r=await o.json(),{data:s,meta:n}=r;return{success:!0,data:s,meta:n}}catch(r){return{success:!1,message:r.message}}}}const z=new q;class G{async profiles(){const e=`${p}?_posts=true&_following=true&_followers=true`,t=await fetch(e,{method:"GET",headers:i()});if(!t.ok)throw new Error("Fetching profiles failed");try{const o=await t.json(),{data:r,meta:s}=o;return{success:!0,data:new l.Profiles(r),meta:s}}catch(o){return{success:!1,message:o.message}}}async profile(e){const t=`${p}/${e}?_posts=true&_following=true&_followers=true`,o=await fetch(t,{method:"GET",headers:i()});if(!o.ok)throw new Error("Fetching profile failed");try{const{data:r,meta:s}=await o.json();return{success:!0,data:new l.Profile(r._count,r.avatar,r.banner,r.bio,r.email,r.followers,r.following,r.name,r.posts),meta:s}}catch(r){return{success:!1,message:r.message}}}async update(e,t){const o=JSON.stringify(t),r=`${p}/${e}`,s=await fetch(r,{method:"PUT",headers:i(),body:o});if(!s.ok)throw new Error("Update profile failed");try{const n=await s.json(),{data:c,meta:h}=n;return{success:!0,data:new l.Profile(c._count,c.avatar,c.banner,c.bio,c.email,c.followers,c.following,c.name,c.posts),meta:h}}catch(n){return{success:!1,message:n.message}}}async posts(e,t=1){const o=`${p}/${e}/posts?limit=12&page=${t}&_author=true&_posts=true&_following=true&_followers=true&_comments=true`,r=await fetch(o,{method:"GET",headers:i()});if(!r.ok)throw new Error("Fetching all posts by profile failed");try{const{data:s,meta:n}=await r.json();return{success:!0,data:new l.Posts(s),meta:n}}catch(s){return{success:!1,message:s.message}}}async follow(e){const t=`${p}/${e}/follow`,o=await fetch(t,{method:"PUT",headers:i()});if(!o.ok)throw new Error("Follow author failed");try{const r=await o.json(),{data:s,meta:n}=r;return{success:!0,data:s,meta:n}}catch(r){return{success:!1,message:r.message}}}async unfollow(e){const t=`${p}/${e}/unfollow`,o=await fetch(t,{method:"PUT",headers:i()});if(!o.ok)throw new Error("Unfollow user failed");try{const r=await o.json(),{data:s,meta:n}=r;return{success:!0,data:s,meta:n}}catch(r){return{success:!1,message:r.message}}}async search(e){const t=`${p}/search?q=${e}`,o=await fetch(t,{method:"GET",headers:i()});if(!o.ok)throw new Error("Search profile with query failed");try{const r=await o.json(),{data:s,meta:n}=r;return{success:!0,data:new l.Profile(s._count,s.avatar,s.banner,s.bio,s.email,s.followers,s.following,s.name,s.posts),meta:n}}catch(r){return{success:!1,message:r.message}}}}const H=new G;class J{async posts(e,t=1){const o=`${f}/search?q=${e}&limit=12&page=${t}&_author=true&_comments=true`;try{const r=await fetch(o,{method:"GET",headers:i()});if(!r.ok){const c=await r.text();throw new Error(`API error: ${r.status} ${r.statusText}. Details: ${c}`)}const{data:s,meta:n}=await r.json();return{success:!0,data:new l.Posts(s),meta:n}}catch(r){return{success:!1,message:r.message}}}}const K=new J;class Y{async tags(e,t=1){const o=`${f}/?limit=12&page=${t}&_tag=${e}&_author=true&_comments=true`,r=await fetch(o,{method:"GET",headers:i()});if(!r.ok)throw new Error("Fetching profiles failed");try{const{data:s,meta:n}=await r.json();return{success:!0,data:new l.Posts(s),meta:n}}catch(s){return{success:!1,message:s.message}}}}const W=new Y,w={AuthRepository:O,CommentRepository:M,FollowRepository:N,PostRepository:z,ProfileRepository:H,SearchRepository:K,TagRepository:W};class V{constructor(e="token",t="user"){this.tokenKey=e,this.userKey=t,this.authRepository=w.AuthRepository}get authToken(){return localStorage.getItem(this.tokenKey)}set authToken(e){localStorage.setItem(this.tokenKey,e)}get authUser(){const e=localStorage.getItem(this.userKey);return e?JSON.parse(e):null}set authUser(e){localStorage.setItem(this.userKey,JSON.stringify(e))}clearAuthData(){localStorage.removeItem(this.tokenKey),localStorage.removeItem(this.userKey)}async login(e,t){return await this.authRepository.login(e,t)}async register(e,t,o){return await this.authRepository.register(e,t,o)}logout(){this.clearAuthData()}}const X=new V;class Q{constructor(){this.commentRepository=w.CommentRepository}async comments(e){return this.commentRepository.comments(e)}async create(e,t){return this.commentRepository.create(e,t)}async delete(e,t){return this.commentRepository.delete(e,t)}}const Z=new Q;class ee{constructor(){this.followRepository=w.FollowRepository}async follow(e){return await this.followRepository.follow(e)}async unfollow(e){return await this.followRepository.unfollow(e)}async network(e){return await this.followRepository.network(e)}}const te=new ee;class re{constructor(){this.postRepository=w.PostRepository}async posts(e=1){return await this.postRepository.posts(e)}async post(e){return await this.postRepository.post(e)}async create(e){if(!e.title||!e.body)throw new Error("Title and Body are required to create a post");return await this.postRepository.create(e)}async update(e,t){if(!t.title||!t.body)throw new Error("Title and Body are required to create a post");return await this.postRepository.update(e,t)}async delete(e){return await this.postRepository.delete(e)}}const oe=new re;class se{constructor(){this.profileRepository=w.ProfileRepository}async profiles(){return await this.profileRepository.profiles()}async profile(e){return await this.profileRepository.profile(e)}async update(e,t){return await this.profileRepository.update(e,t)}async posts(e,t=1){return await this.profileRepository.posts(e,t)}async follow(e){return await this.profileRepository.follow(e)}async unfollow(e){return await this.profileRepository.unfollow(e)}async search(e){return await this.profileRepository.search(e)}}const ae=new se;class ne{constructor(){this.searchRepository=w.SearchRepository}async posts(e,t=1){return await this.searchRepository.posts(e,t)}}const ce=new ne;class ie{constructor(){this.tagRepository=w.TagRepository}async tags(e,t=1){return await this.tagRepository.tags(e,t)}}const le=new ie,d={AuthService:X,CommentService:Z,FollowService:te,PostService:oe,ProfileService:ae,SearchService:ce,TagService:le};class ue{constructor(){this.authService=d.AuthService}async login({email:e,password:t}){try{const{token:o,user:r}=await this.authService.login(e,t);return{token:o,user:r}}catch(o){throw console.error("Login error:",o),new Error("Login failed. Please check your credentials.")}}async register({name:e,email:t,password:o}){try{const r=await this.authService.register(e,t,o);return{name:e,email:t}}catch(r){throw console.error("Register error:",r),new Error("Register Failed. Please check you data input.")}}logout(){try{this.authService.logout(),console.log("Logout successful")}catch(e){console.error("Logout failed:",e)}}get authToken(){try{return this.authService.authToken}catch(e){console.error("Failed to get authToken:",e)}}set authToken(e){try{this.authService.authToken=e}catch(t){console.error("Failed to set authToken:",t)}}get authUser(){try{return this.authService.authUser}catch(e){console.error("Failed to get authUser:",e)}}set authUser(e){try{this.authService.authUser=e}catch(t){console.error("Failed to set authUser:",t)}}clearAuthData(){this.authService.clearAuthData()}}const g=new ue,u={redirectTo:a=>{if(typeof a!="string")throw new Error("path must be a string");window.location.href=a},getUrlParams:a=>new URLSearchParams(window.location.search).get(a),date:a=>{const e=new Date(a),t=new Date,o=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],r=e.getDate();let n=`${o[e.getMonth()]} ${r}`;return e.getFullYear()!==t.getFullYear()&&(n+=` ${e.getFullYear()}`),n},time:a=>{const e=new Date,t=new Date(a),o=Math.floor((e-t)/1e3);let r=Math.floor(o/31536e3);return r>1?`${r} years ago`:r===1?"1 year ago":(r=Math.floor(o/2592e3),r>1?`${r} months ago`:r===1?"1 month ago":(r=Math.floor(o/86400),r>1?`${r} days ago`:r===1?"1 day ago":(r=Math.floor(o/3600),r>1?`${r} hours ago`:r===1?"1 hour ago":(r=Math.floor(o/60),r>1?`${r} minutes ago`:r===1?"1 minute ago":o>1?`${o} seconds ago`:"now"))))},formatTags:a=>(typeof a=="string"&&(a=[a]),!a||a.length===0?"":a.map(e=>`<a href="/tags/?tag=${encodeURIComponent(e)}" class="tag bg-gray-100 rounded-2xl text-sm px-1 py-2 hover:bg-gray-200">#${e}</a>`).join(" "))};async function he(a,e){await pe(a,e),await ge()}function de(a){const e=m.AuthController.authUser;return e&&e.name===a}function me(a){if(!a)return 0}function pe(a,e){const t=document.createElement("div");if(t.id="comment-trees-container",t.setAttribute("class","comments my-8"),t.innerHTML="",!Array.isArray(a)){const o=m.AuthController.authUser;return a.author=o,[a]}a.forEach(o=>{const r=fe(o);t.appendChild(r)}),e.appendChild(t)}function fe(a){const e=me(a.replyToId),t=document.createElement("div");return t.classList.add("comment-wrapper",`comment-wrapper-deep-${e}`),e===0&&t.classList.add("root"),t.setAttribute("data-comment-id",a.id),t.setAttribute("data-post-id",a.postId),t.innerHTML=`
    <div id="comment-node-${a.id}" class="comment single-comment-node flex items-center ${e===0?"root":""} comment--deep-${e}" data-comment-author-id="1255465" data-user-id="1255465">
      <div class="comment__inner flex">
        ${we(a.author.name,a.author.avatar.url,a.author.avatar.alt)}
        ${ye(a.author.name,u.date(a.created),a.body)}
      </div>
    </div>
  `,t}function we(a,e,t){return`
  <a class="shirnk-0 mr-4" href="/profile/?author=${a}">
    <img class="h-8 w-8 rounded-full" src="${e}" alt="${t}" loading="lazy" />
  </a>
`}function ye(a,e,t){return m.AuthController.authUser,`
    <div class="inner-comment comment__details">
      <div class="comment__content mb-1">
        <div class="flex items-center">
          <div class="relative font-medium">
            <a id="comment-profile-preview-trigger-1251256" class="profile-preview-card__trigger p-1 -my-1 -mlk-1" href="/profile/?author=${a}">
              ${a}
            </a>
          </div>
          <span class="color-base-30 px-2 m:pl-0" role="presentation">•</span>
          <div class="comment-date text-gray-600 text-sm">${e}</div>
          ${de(a)?`<div class="comment__delete">
            <button class="btn btn__delete-comment">Delete</button>
          </div>`:""}
        </div>
        <dic class="comment__body text-lg">
          <p>${t}</p>
        </div>
        ${Se()}
      </div>
    </div>
  `}function ge(){document.querySelectorAll(".btn__delete-comment").forEach(e=>{e.addEventListener("click",ve)})}async function ve(a){const e=a.target.closest(".comment-wrapper"),t=Number(e.dataset.postId),o=Number(e.dataset.commentId);await m.CommentController.onDelete(t,o,e)}function Se(){return`
    <footer class="comment__footer">
      ${be()}
      ${Ce()}
    </footer>
  `}function be(){return`
    <button class="tooltip__activator btn btn--ghost btn--icon-left btn-s mr-1 reaction-link inline-flex reaction-button" 
      id="button-for-comment-1251256" 
      data-comment-id="1251256" 
      aria-label="like" 
      data-tracking-name="comment_heart_button" 
      aria-pressed="false">
      
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" role="img" aria-labelledby="aj3j3dglouede37ubxl9e3f4p1pidimm" class="crayons-icon reaction-icon not-reacted">
        <title id="aj3j3dglouede37ubxl9e3f4p1pidimm">Like comment:</title>
        <path d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z"></path>
      </svg>

      <span class="reactions-count" id="reactions-count-1251256">2</span>
      <span class="reactions-label m:inline-block">&nbsp;likes</span>
    </button>
  `}function Ce(){return`
    <a class="actions btn btn-reply btn--ghost btn--s btn--icon-left toggle-reply-form mr-1 inline-flex" 
      href="#/tymzap/dont-ever-use-if-else-use-this-instead-512h/comments/new/2j4p6" 
      data-comment-id="1251256" 
      data-path="/tymzap/dont-ever-use-if-else-use-this-instead-512h/comments/2j4p6" 
      data-tracking-name="comment_reply_button" 
      data-testid="reply-button-1251256" 
      rel="nofollow">
      
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" role="img" aria-labelledby="anl4azo1zr0a396xnn3syhhaz50hpbjb" class="icon reaction-icon not-reacted">
        <title id="anl4azo1zr0a396xnn3syhhaz50hpbjb">Comment button</title>
        <path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z"></path>
      </svg>
      
      <span class="m:inline-block">Reply</span>
    </a>
  `}class $e{constructor(){this.commentService=d.CommentService}async comments(e){try{const{data:t,meta:o}=await this.commentService.comments(e);return{data:this.sortedCommentsDateAsc(t),meta:o}}catch(t){throw console.error("Fetch comments error:",t),new Error("Fetch comments failed.")}}async create(e,t){try{const{success:o,data:r,meta:s}=await this.commentService.create(e,t);return console.log("Create comment success:",r),{success:o,commentData:r,meta:s}}catch(o){throw console.error("Create comment error:",o),new Error("Create comment failed.")}}async delete(e,t){try{const{success:o,data:r,meta:s}=await this.commentService.delete(e,t);return{success:o,data:r,meta:s}}catch(o){throw console.error("Delete comment error:",o),new Error("Delete comment failed.")}}sortedCommentsDateAsc(e){const t=e.comments.sort((o,r)=>new Date(o.created)-new Date(r.created));return{...e,comments:t}}structuredCommentData(e,t=null){return t?{body:e,replyToId:Number(t)}:{body:e}}async reRenderComment(e){const{data:t}=await this.comments(e),o=document.querySelector("section");if(o){const r=o.querySelector("#comment-trees-container");r&&r.remove(),await he(t.comments,o)}}async onComment(e,t){e.preventDefault();const o=e.target,r=new FormData(o),s=Object.fromEntries(r.entries()),{comment:n}=s,c=this.structuredCommentData(n);this.createHandler(t,c),document.querySelector("#comment-trees-container")}async createHandler(e,t){const{success:o,commentData:r}=await this.create(e,t);if(o){const s=document.querySelector("section");s&&s.querySelector("#comment-trees-container")&&(await this.reRenderComment(e),this.clearCommentInput())}else alert("An error occurred while creating the comment. Please try again.")}clearCommentInput(){const e=document.getElementById("text-area");e.value=""}async onDelete(e,t,o){confirm("Are you sure you want to delete this comment?")&&await this.deleteHandler(e,t,o)}async deleteHandler(e,t,o){const{success:r}=await this.delete(e,t);r?(o.remove(),alert("Comment deleted successfully!")):alert("An error occurred while deleting the comment. Please try again.")}}const Ee=new $e;class Pe{constructor(){this.followService=d.FollowService}async follow(e){try{const{success:t,data:o,meta:r}=await this.followService.follow(e);return{success:t,data:o,meta:r}}catch(t){throw console.error("Fetch follow error:",t),new Error("Fetch follow failed.")}}async unfollow(e){try{const{success:t,data:o,meta:r}=await this.followService.unfollow(e);return{success:t,data:o,meta:r}}catch(t){throw console.error("Fetch follow error:",t),new Error("Fetch follow failed.")}}async network(e){try{const{success:t,data:o,meta:r}=await this.followService.network(e);return{success:t,data:o,meta:r}}catch(t){throw console.error("Fetch follow error:",t),new Error("Fetch follow failed.")}}}const Te=new Pe;class Re{constructor(e){this.authController=g}async onLogin(e){e.preventDefault();const t=e.target,o=new FormData(t),r=Object.fromEntries(o.entries());await this.handleLogin(r)}async handleLogin(e){try{const{email:t,password:o}=e,{token:r,user:s}=await this.authController.login({email:t,password:o});console.log("Login success:",{user:s}),d.AuthService.authToken=r,d.AuthService.authUser=s,u.redirectTo("/")}catch(t){console.error("Login failed:",t)}}}const Ae=new Re;class _e{constructor(e){this.authController=g,this.initEvents()}initEvents(){const e=document.getElementById("btn-logout");e&&e.addEventListener("click",t=>this.handleLogout(t))}handleLogout(e){e.preventDefault(),this.authController.logout(),u.redirectTo("/auth/login/")}}class Fe{constructor(){this.postService=d.PostService}async posts(e=1){try{const{success:t,data:o,meta:r}=await this.postService.posts(e);return{success:t,data:o,meta:r}}catch(t){throw console.error("Fetch posts error:",t),new Error("Fetch posts failed.")}}async post(e){try{const{data:t,meta:o}=await this.postService.post(e);return{data:t,meta:o}}catch(t){throw console.error("Fetch post error:",t),new Error("Fetch single post failed.")}}async create(e){try{const{data:t,meta:o}=await this.postService.create(e);console.log("Create post success:",{postData:t}),u.redirectTo(`/post/?id=${t.id}`)}catch(t){console.error("Create post failed:",t)}}async update(e,t){try{const{data:o,meta:r}=await this.postService.update(e,t);console.log("Create post success:",{postData:o}),u.redirectTo(`/post/?id=${o.id}`)}catch(o){console.error("Create post failed:",o)}}async delete(e){try{const t=await this.postService.delete(e);t.success?(console.log(t.message),alert(t.message),u.redirectTo("/")):(console.error("Failed to delete post:",result.message),alert("Error deleting post"))}catch(t){console.error("Error deleting post:",t),alert("An error occurred while deleting the post.")}}async onCreatePost(e){e.preventDefault();const t=e.target,o=new FormData(t),r=Object.fromEntries(o.entries());r.tags&&(r.tags=this.structuredTags(r.tags)),r.media&&(r.media=this.structuredMedia(r)),await this.create(r)}structuredTags(e){return e?e.split(",").map(t=>t.trim()):[]}structuredMedia(e){return{url:e.media,alt:e.alt||""}}async onUpdatePost(e,t){const o=e.target,r=new FormData(o),s=Object.fromEntries(r.entries());s.tags&&(s.tags=this.structuredTags(s.tags)),s.media&&(s.media=this.structuredMedia(s)),await this.update(t,s)}onCancelPost(e=null){e||u.redirectTo("/"),e&&u.redirectTo(`/post/?id=${e}`)}async onDeletePost(e){await this.delete(e)}}const Ie=new Fe;class ke{constructor(){this.profileService=d.ProfileService}async profile(e){try{const{data:t,meta:o}=await this.profileService.profile(e);return{data:t,meta:o}}catch(t){throw console.error("Fetch profile error:",t),new Error("Fetch profile failed.")}}async update(e,t){try{const o=await this.profileService.update(e,t);if(o.success){const{data:r,meta:s}=o;console.log("Update profile success:",{profileData:r}),alert("Profile update success"),u.redirectTo("/profile/")}else console.error("Failed to update profile:",o.message),alert("Failed to update profile. Please try again.")}catch(o){throw console.error("Update profile error:",o),new Error("Update profile failed.")}}async posts(e,t=1){try{const{success:o,data:r,meta:s}=await this.profileService.posts(e,t);return{success:o,data:r,meta:s}}catch(o){throw console.error("Fetch posts on profile error:",o),new Error("Fetch posts on profile failed.")}}async onUpdateProfile(e,t){const o=e.target,r=new FormData(o),s=Object.fromEntries(r.entries()),n=this.structureProfileData(s);await this.update(t,n)}structureProfileData(e){return{bio:e.bio,avatar:typeof e.avatar=="string"?{url:e.avatar,alt:e.avatarAlt}:e.avatar,banner:typeof e.banner=="string"?{url:e.banner,alt:e.bannerAlt}:e.banner}}onCancelProfileUpdate(){u.redirectTo("/profile/")}}const je=new ke;class De{constructor(e){this.authController=g}async onRegister(e){e.preventDefault();const t=e.target,o=new FormData(t),r=Object.fromEntries(o.entries());await this.handleRegister(r)}async handleRegister(e){try{const{name:t,email:o,password:r}=e,s=await this.authController.register({name:t,email:o,password:r});console.log("Register success:",{name:t,email:o}),u.redirectTo("/")}catch(t){console.error("Register failed:",t)}}}const Le=new De;class Ue{constructor(){this.searchService=d.SearchService}async posts(e,t=1){try{const{success:o,data:r,meta:s}=await this.searchService.posts(e,t);return{success:o,data:r,meta:s}}catch(o){throw console.error("Fetch search error:",o),new Error("Fetch search failed.")}}onSearch(e){u.redirectTo(`/search/?q=${encodeURIComponent(e)}`)}}const Oe=new Ue;class xe{constructor(){this.tagService=d.TagService}async tags(e,t=1){try{const{success:o,data:r,meta:s}=await this.tagService.tags(e,t);return{success:o,data:r,meta:s}}catch(o){throw console.error("Fetch tags error:",o),new Error("Fetch tags failed.")}}}const Me=new xe,m={AuthController:g,CommentController:Ee,FollowController:Te,LoginController:Ae,LogoutController:_e,PostController:Ie,ProfileController:je,RegisterController:Le,SearchController:Oe,TagsController:Me};function Be(){return!!d.AuthService.authToken}const Ne={"/":{path:"/src/js/router/views/home.js",protected:!0},"/auth/":{path:"/src/js/router/views/auth/auth.js",protected:!1},"/auth/login/":{path:"/src/js/router/views/auth/login.js",protected:!1},"/auth/register/":{path:"/src/js/router/views/auth/register.js",protected:!1},"/post/":{path:"/src/js/router/views/post/index.js",protected:!0},"/post/create/":{path:"/src/js/router/views/post/create.js",protected:!0},"/post/edit/":{path:"/src/js/router/views/post/update.js",protected:!0},"/profile/":{path:"/src/js/router/views/profile/index.js",protected:!0},"/profile/edit/":{path:"/src/js/router/views/profile/update.js",protected:!0},"/tags/":{path:"/src/js/router/views/tags/index.js",protected:!0},"/follow/":{path:"/src/js/router/views/follow/index.js",protected:!0},"/search/":{path:"/src/js/router/views/search/index.js",protected:!0},"/notFound/":{path:"/src/js/router/views/notFound.js",protected:!1}};async function qe(a=window.location.pathname){const e=Ne[a];try{const t=await import(e.path);if(e.protected&&!Be()){alert("You must be logged in to view this page"),u.redirectTo("/auth/login/");return}}catch(t){console.error("Error loading route module:",t)}}await qe(window.location.pathname);new m.LogoutController(m.AuthController);function ze(){Ge(),He(),Je(),Ye(),Ke()}function Ge(){const a=document.querySelectorAll(".avatar-image");if(m.AuthController.authUser){const{avatar:e}=m.AuthController.authUser;a.forEach(t=>{t.src=e.url,t.alt=e.alt})}}function He(){const a=document.getElementById("user-name"),e=document.getElementById("user-email");if(a&&e){const{name:t,email:o}=m.AuthController.authUser;a.textContent=t,e.textContent=o}}function Je(){const a=document.getElementById("user-menu-button"),e=document.querySelector('[aria-labelledby="user-menu-button"]');e&&a.addEventListener("click",()=>{e.classList.toggle("hidden")})}function Ke(){const a=document.getElementById("mobile-menu-button"),e=document.getElementById("mobile-menu");e&&a.addEventListener("click",()=>{e.classList.toggle("hidden")})}function Ye(){const a=document.querySelector('form[name="search"]');a&&(a.addEventListener("submit",We),document.getElementById("search-input").addEventListener("keypress",Ve))}function We(a){a.preventDefault();const t=document.getElementById("search-input").value.trim();t&&m.SearchController.onSearch(t)}function Ve(a){if(a.key==="Enter"){a.preventDefault();const e=a.target.value.trim();e&&m.SearchController.onSearch(e)}}ze();
