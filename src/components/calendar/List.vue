<script setup lang="ts">
</script>

<template>
    <div class="wrap">
        <ul class="list" v-for="id in 3" :key="id">
            <li>
                <span :class="`cal_icon${id} cal_icon`">My (1)</span>
                <ul>
                    <li v-for="id2 in 2" :key="id2">
                        <div class="btns">
                            <button class="del">삭제</button>
                            <button class="re">수정</button>
                        </div>
                        <div class="con">
                            <span>18 Aug<br/><br/>18:00</span>
                            <p>
                                <span>반포보딩</span>
                                <span>메모내용</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

  
<style lang="scss" scoped>
    .wrap{
        margin-top:30px;
    }

    .list{
        > li{
            border-top:1px solid var(--c-lnk-basic);
            padding: 20px 0;
            > span{
                display: block;
                padding-bottom: 10px;
                color:var(--c-lnk-dark);
                font-size:var(--f-theme-small);
            }
        }

        ul{
            padding: 0 10px;
        }

        ul li{
            margin:10px 0;

   
        }

        .btns{
            display: flex;
            margin-bottom: 5px;
            flex-direction: row-reverse;
            flex-wrap: nowrap;
            color:var(--c-lnk-dark);
            font-size:var(--f-theme-tiny);
        }
        
        button{
            line-height: 1;
        }
        .del{
            color:var(--c-lnk-black);
            padding-left:5px;
            margin-left:5px;
            border-left:1px solid var(--c-lnk-dark)
        }
        .con{
            font-size: var(--f-theme-tiny);
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: flex-start;
            align-items: flex-start;
            > span{
                width:60px;
                padding-left:12px;
                display: block;
                position: relative;
                &:after{
                    content:"";
                    position: absolute;
                    height: 100%;
                    width:2px;
                    background: var(--c-theme-blue);
                    left:0;
                    top:0;
                }
            }
            > p span:first-child{
                display: block;
                line-height: 1;
                color:var(--c-lnk-black);
                padding-bottom:12px;
            }
            > p{
                color:var(--c-lnk-dark)
                
            }
        }

        .cal_icon::before{
            content:"";
            display: inline-block;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            margin-right: 5px;
            vertical-align: middle;
        }

        .cal_icon1::before{
            background: var(--c-lnk-dark);
        }
        .cal_icon2::before{
            background: var(--c-lnk-dark);
        }
        .cal_icon3::before{
            background: var(--c-lnk-dark);
        }
    }
</style>