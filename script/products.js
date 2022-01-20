
// 建立vue原件
// 需先抓到同個domain中的cookie所以需要先在生命週期中放置token
// 注意，這次有刪除按鈕，需加入刪除事件

const app={
    data(){
        return{
            name:"我建好了Vue原件",
            url:'https://vue3-course-api.hexschool.io/v2',
            path:'brunoyu2022',
            token:"eyJhbGciOiJSUzI1NiIsImtpZCI6InRCME0yQSJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS92dWUtY291cnNlLWFwaSIsImF1ZCI6InZ1ZS1jb3Vyc2UtYXBpIiwiYXV0aF90aW1lIjoxNjQyNjc5MTE3LCJ1c2VyX2lkIjoiQTlFUkZrVXZCZmRySFl5eTJaMXAwV1djbTZnMSIsInN1YiI6IkE5RVJGa1V2QmZkckhZeXkyWjFwMFdXY202ZzEiLCJpYXQiOjE2NDI2NzkxMTcsImV4cCI6MTY0MzExMTExNywiZW1haWwiOiJicnVub3l1MjAyMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYnJ1bm95dTIwMjJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.R81nd64OXXcEls2DcjrZwLAUQ8K7_NVFe6Zanr2M8ByeFPZ2Kkgwz3sf6RbuY__nAfT7VYiZQe3vMYGNYd_KaZq5KFAlVpM1a14I0UP4xaSFnURJJZ0hzgKd3ZYkMMynErxTbKSXM8InMV-2i8n7ALtxckussK69YPrUIhmtm61hdKzf94w3PiuKUhx-RCpURhTvVx_1gwa0Kg07JTNHOyirwaovVd2KZBVxpDbX7AfAzG3tYS7hCizXckFh_W2WUxDwphpg63bjeLc2QTSpK28iPHEqH7fdVlRKypC9D_sY28OOYvwSimQuzRYpSVdBUiC2nfVg1YIjHhHnE7fIFw ",
            expires:1643111117219,
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
        axios.defaults.headers.common['Authorization'] = this.token;
        axios.post(`${this.url}/api/user/check`)
        // 成功結果接收
        .then((res)=>{
            console.log(res.data);
            console.log("成功登入")
          })
          .catch((error)=>{
            console.dir(error);
          })

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


        // 在瀏覽器中取cookie中的token
        // axios.defaults.headers.common['Authorization'] = token;
        // const token = document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        // 確認是否有成功登入
        



    },
}
Vue.createApp(app).mount('#app');