
// 建立vue原件
// 需先抓到同個domain中的cookie所以需要先在生命週期中放置token
// 注意，這次有刪除按鈕，需加入刪除事件

const app={
    data(){
        return{
            name:"我建好了Vue原件",
            url:'https://vue3-course-api.hexschool.io/v2',
            path:'brunoyu2022',
            // // 測試用token
            products:[],
            productDisplay:[],

        }
    },
    methods:{
        // 加入呈現產品功能
        selectBtn(evt){
            const targetItem=this.products.filter(item=>item.id===evt.target.dataset.id);
            this.productDisplay=targetItem[0];
        }


    },
    computed:{
        // 計算is_enabled=1的總數
        total(){
            let total=0;
            this.products.forEach(item=>{
                if(item.is_enabled){
                    total+=1;
                }
            });
            return total;
        }
    },
    // 需加入取同個domain取cookie的方法以獲得取得data的授權
    // 所以測試時先準備token，後續正式串接後再應用網頁給予的token
    created(){
        // 取token先確認
        // 帶入遠端data到this.products中

        // 測試時，先用data內測試用的token
        // 將該token及入header中使用post發送
        // axios.defaults.headers.common['Authorization'] = this.token;
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;

        axios.post(`${this.url}/api/user/check`)
        // 成功結果接收
        .then((res)=>{
            console.log(res.data);
            console.log("成功登入")
        //   帶入遠端data使用方法get
        axios.get(`${this.url}/api/${this.path}/admin/products`)
        // 成功結果接收
        .then((res)=>{
            console.log("成功取得資料");
            console.log(res.data.products);
            this.products=res.data.products;
          })
          .catch((error)=>{
            console.dir(error.data.message);
            alert(`${error.data.message}`);

          })
          })
          .catch((error)=>{
            console.dir(error);
            window.location.href='index.html';
          })




        // // 在瀏覽器中取cookie中的token
        // axios.defaults.headers.common['Authorization'] = token;
        // const token = document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        // // 確認是否有成功登入
        



    },
}
Vue.createApp(app).mount('#app');