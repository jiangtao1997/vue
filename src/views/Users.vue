<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Button type="primary" @click="addData">添加数据</Button>
    <Table :columns="columns" :data="listData"></Table>
    <!-- 添加弹出对话框 -->
    <Modal
        v-model="modal1"
        title="Common Modal dialog box title"
        @on-ok="ok"
        @on-cancel="cancel">
            <!-- 表单 -->
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="Name" prop="name">
                <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
            </FormItem>
            <FormItem label="password" prop="password">
                <Input v-model="formValidate.password" placeholder="Enter your password"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </Modal>

    <!-- 分页 -->
    <Page :total="total" show-sizer @on-change="onChangePage" :page-size-opts="[5,10,15,20]" />
  </div>
</template>

<script>
export default {
  data(){
    return{
        // 对话框默认消失
      modal1: false,
// 数据字段
    formValidate: {
            name: '',
            password: ''
        },
        // 验证规则
        ruleValidate: {
            name: [
                { required: true, message: 'The name cannot be empty', trigger: 'blur' }
            ],
            password: [
                { required: true, message: 'password cannot be empty', trigger: 'blur' }
            ],
        },
    //   表头名称
      columns: [
                  {
                      title: '姓名',
                      key: 'name'
                  },
                  {
                      title: '密码',
                      key: 'password'
                  }
                ],
    // 将数据库中的数据添加到数组中
    listData:[],
    // 分页数
    total:0,
    page:1
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
                    this.axios({
                        url:'http://localhost:3000/users',
                        method:'post',
                        data:this.formValidate
                    }).then(res=>{
                        console.log(res.data);
                         this.$Message.success('数据添加成功');
                         this.modal1=false;
                         this.getDate();
                    })
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
        url:'http://localhost:3000/users/list',
        method:'post',
        data:{
            page:this.page
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
    }


  },
//   钩子函数
  mounted(){
      this.getDate();
    }
}
</script>

