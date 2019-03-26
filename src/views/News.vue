<template>
  <div class="about">


      <Row>
        <Col span="4">
            <Tree :data="treeData"></Tree>
        </Col>
        <Col span="20">
            <Button type="primary" @click="addData">添加数据</Button>
            <Button type="error" @click="removeData">删除多个数据</Button>
            <Input search v-model="name" @on-search="searchData" enter-button="搜索" placeholder="输入搜索的关键字" />
            <Table :columns="columns" :data="listData" @on-selection-change="onSelectionChange"></Table>
            <!-- 添加弹出对话框 -->
            <Modal
                v-model="modal1"
                title="Common Modal dialog box title"
                @on-ok="ok"
                @on-cancel="cancel">
                    <!-- 表单 -->
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <FormItem label="新闻标题" prop="title">
                        <Input v-model="formValidate.title" placeholder="Enter your title"></Input>
                    </FormItem>
                    <quill-editor v-model="formValidate.content"
                        ref="myQuillEditor"
                        >
                    </quill-editor>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                        <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                    </FormItem>
                </Form>
            </Modal>

            <!-- 分页 -->
            <Page :total="total" show-sizer @on-change="onChangePage" @on-page-size-change="onPageSizeChange" :page-size-opts="[5,10,15,20]" />
        </Col>
      </Row>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

import { Base } from '../mixins/Base'
export default {
    // 编辑器
    components: {
    quillEditor
  },
//  引入公用模块
  mixins:[Base],
  data(){
    return{
    treeData:[],
    module:'news',
// 数据字段
    formValidate: {
            title: '',
            content: ''
        },
        // 验证规则
        ruleValidate: {
            title: [
                { required: true, message: 'The title cannot be empty', trigger: 'blur' }
            ],
            content: [
                { required: true, message: 'content cannot be empty', trigger: 'blur' }
            ],
        },
    //   表头名称
      columns: [
            {
                type: 'selection',
                width: 60,
                align: 'center'
            },
                {
                    title: '新闻标题',
                    key: 'title'
                },
            //   操作
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
  },
  methods:{
      getTreeData(){
          this.axios({
              url:'http://localhost:3000/cate/list/1',
              method:'post'
          }).then(res=>{
              console.log(res.data);
              this.treeData = res.data
          })
      }
  },
  mounted(){
      this.getTreeData();
  }
}
</script>

