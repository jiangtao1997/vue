<template>
  <div class="about">
    <Button type="primary" @click="addData">添加数据</Button>
    <Button type="error" @click="removeData">删除多个数据</Button>
    <Input search v-model="name" @on-search="searchData" enter-button="搜索" placeholder="输入搜索的关键字" />
    <Table :columns="columns" :data="listData" @on-selection-change="onSelectionChange"></Table>
    <!-- 添加弹出对话框 -->
    <Modal
        v-model="modal1"
        title="数据操作"
        @on-ok="ok"
        @on-cancel="cancel">
            <!-- 表单 -->
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="用户名" prop="name">
                <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
            </FormItem>
            <FormItem label="密码" prop="password">
                <Input v-model="formValidate.password" placeholder="Enter your password"></Input>
            </FormItem>
            <!-- 新增表单 -->
            <FormItem label="邮箱" prop="email">
                <Input v-model="formValidate.email" placeholder="Enter your e-mail"></Input>
            </FormItem>
            <!-- 性别 -->
            <FormItem label="性别" prop="sex">
                <RadioGroup v-model="formValidate.sex">
                    <Radio label="男">男</Radio>
                    <Radio label="女">女</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="年龄" prop="avg">
                <Input v-model="formValidate.avg" placeholder="Enter your avg"></Input>
            </FormItem>
            <FormItem label="电话" prop="tel">
                <Input v-model="formValidate.tel" placeholder="Enter your tel"></Input>
            </FormItem>
            <FormItem label="身份证" prop="card">
                <Input v-model="formValidate.card" placeholder="Enter your card"></Input>
            </FormItem>

            <FormItem label="住址" prop="address">
                <Input v-model="formValidate.address" placeholder="Enter your address"></Input>
            </FormItem>
            <FormItem label="爱好" prop="checkbox">
                <CheckboxGroup v-model="formValidate.checkbox">
                    <Checkbox label="抽烟"></Checkbox>
                    <Checkbox label="喝酒"></Checkbox>
                    <Checkbox label="烫头"></Checkbox>
                    <Checkbox label="打麻将"></Checkbox>
                </CheckboxGroup>
            </FormItem>

            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </Modal>

    <!-- 分页 -->
    <Page :total="total" show-sizer @on-change="onChangePage" @on-page-size-change="onPageSizeChange" :page-size-opts="[5,10,15,20]" />
  </div>
</template>

<script>
import { Base } from '../mixins/Base'
export default {
    mixins:[Base],
  data(){
    return{

// 数据字段
    formValidate: {
            name: '',
            password: '',
            email: '',
            sex:'',
            avg:'',
            tel:'',
            card:'',
            address:'',
            checkbox:[]
        },
        // 验证规则
        ruleValidate: {
            name: [
                { required: true, message: 'The name cannot be empty', trigger: 'blur' }
            ],
            password: [
                { required: true, message: 'password cannot be empty', trigger: 'blur' }
            ],
            email:[
                { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
            ],
            sex:[
                { required: true, message: 'Please select gender', trigger: 'change' }
            ],
            avg: [
                { required: true, message: 'password cannot be empty', trigger: 'blur' }
            ],
            tel: [
                { required: true, message: 'password cannot be empty', trigger: 'blur' }
            ],
            card: [
                { required: true, message: 'password cannot be empty', trigger: 'blur' }
            ],
            address: [
                { required: true, message: 'password cannot be empty', trigger: 'blur' }
            ],
            checkbox:[
                { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
            ]

        },
    //   表头名称
      columns: [
            {
                type: 'selection',
                width: 60,
                align: 'center'
            },
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '密码',
                    key: 'password'
                },
                {
                    title: '邮箱',
                    key: 'email'
                },
                {
                    title: '性别',
                    key: 'sex'
                },
                {
                    title: '年龄',
                    key: 'avg'
                },
                {
                    title: '电话',
                    key: 'tel'
                },
                {
                    title: '身份证',
                    key: 'card'
                },
                {
                    title: '住址',
                    key: 'address'
                },
                {
                    title: '爱好',
                    key: 'checkbox'
                },
            //   删除
            {
                title: '操作',
                key: 'action',
                width: 150,
                align: 'center',
                render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    // this.show(params.index)
                                    this.eideData(params.row._id);
                                }
                            }
                        }, '修改'),
                        h('Button', {
                            props: {
                                type: 'error',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    // this.remove(params.index)
                                    this.removeDelete(params.row._id);
                                }
                            }
                        }, '删除')
                    ]);
                }
            }
        ]
    }
  }
}
</script>

