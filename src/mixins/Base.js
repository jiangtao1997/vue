export const Base = {
    data(){
        return{
            // 模块
            module:'users',
            // 对话框默认消失
            modal1: false,
            // 将数据库中的数据添加到数组中
            listData:[],
            // 分页数
            total:0,
            // 默认页数
            page:1,
            // 默认页面个数
            rows:10,
            // 删除多个
            ids:[],
            name:""
        }
      },
      methods:{
        //   添加对话框属性
        ok () {
            this.$Message.info('Clicked ok');
        },
        cancel () {
            this.$Message.info('Clicked cancel');
        },
        addData(){
            this.modal1=true;
        },
    // 表单
        handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(this.formValidate._id && this.formValidate._id.trim().length>0){
                            // 数据修改
                            this.axios({
                                url:`http://localhost:3000/${this.module}/${this.formValidate._id}`,
                                method:'put',
                                data:this.formValidate
                            }).then(res=>{
                                this.$Message.success('数据修改成功');
                                this.modal1=false;
                                this.getDate();
                            })
                        }else{
                            // 数据添加
                            console.log(this.formValidate);
                            this.axios({
                                url:`http://localhost:3000/${this.module}`,
                                method:'post',
                                data:this.formValidate
                            }).then(res=>{
                                console.log(res.data.checkbox[0]);
                                this.$Message.success('数据添加成功');
                                this.modal1=false;
                                this.getDate();
                            })
                        }

                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },

    // 获取数据库中的数据
        getDate(){
          this.axios({
            url:`http://localhost:3000/${this.module}/list`,
            method:'post',
            data:{
                page:this.page,
                rows:this.rows,
                name:this.name
            }
          }).then(res=>{
            this.listData=res.data.rows;
            this.total = res.data.total;
          })
        },
    // 分页
        onChangePage(page){
           this.page = page;
           this.getDate();
        },

        //页面个数
        onPageSizeChange(pageSize){
            this.rows = pageSize;
            this.getDate();
        },
        // 删除
        removeDelete(id){

            this.$Modal.confirm({
                title: '信息确认',
                content: '<p>你就确认删除信息记录？</p>',
                onOk: () => {
                    this.axios({
                        url:`http://localhost:3000/${this.module}/${id}`,
                        method:'delete'
                    }).then(res=>{
                        this.getDate();
                        this.$Message.info('确定');
                    })
                },
                onCancel: () => {
                    this.$Message.info('取消');
                }
            });
        },
        // 删除多个
        onSelectionChange(selection){
            var selectionLen = selection.length;
            if(selectionLen>0){
                for(let i=0;i<selectionLen;i++){
                    this.ids.push(selection[i]._id);
                }
            }
        },
        // 确认删除多个
        removeData(){
            this.$Modal.confirm({
                title: '信息确认',
                content: '<p>你就确认删除多条信息记录？</p>',
                onOk: () => {
                    this.axios({
                        url:`http://localhost:3000/${this.module}/removes`,
                        method:'post',
                        data:{
                            ids:this.ids.toString()
                        }
                    }).then(res=>{
                        this.getDate();
                        this.$Message.info('确定');
                    })
                },
                onCancel: () => {
                    this.$Message.info('取消');
                }
            });
        },
        // 修改
        eideData(id){
            this.axios({
                url:`http://localhost:3000/${this.module}/${id}`,
                method:'get'
            }).then(res=>{
                this.modal1=true;
                this.formValidate=res.data
            });
        },
        // 搜索
        searchData(){
            this.getDate();
        }

      },
    //   钩子函数
      mounted(){
          this.getDate();
        }
}