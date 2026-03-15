import type {FormRules} from 'element-plus'

// ==================== 身份认证 ====================

/** 登录表单校验规则 */
export const authLoginRules: FormRules = {
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度为 3~20 个字符', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9_]+$/,
      message: '用户名只能包含字母、数字和下划线',
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 8, max: 64, message: '密码长度为 8~64 个字符', trigger: 'blur' },
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)\S+$/,
      message: '密码必须包含至少一个字母和一个数字，且不能含有空格',
      trigger: 'blur',
    },
  ],
}

// ==================== 用户 ====================

/** 创建用户表单校验规则 */
export const createUserRules: FormRules = {
  nickname: [
    { required: true, message: '昵称不能为空', trigger: 'blur' },
    { min: 2, max: 20, message: '昵称长度为 2~20 个字符', trigger: 'blur' },
    {
      pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_\-]+$/,
      message: '昵称只能包含中文、字母、数字、下划线和连字符',
      trigger: 'blur',
    },
  ],
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度为 3~20 个字符', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9_]+$/,
      message: '用户名只能包含字母、数字和下划线',
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 8, max: 64, message: '密码长度为 8~64 个字符', trigger: 'blur' },
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)\S+$/,
      message: '密码必须包含至少一个字母和一个数字，且不能含有空格',
      trigger: 'blur',
    },
  ],
  email: [
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' },
  ],
  role: [
    { type: 'array', message: '角色格式不正确', trigger: 'change' },
  ],
}

/** 更新用户表单校验规则（所有字段均为可选） */
export const updateUserRules: FormRules = {
  nickname: [
    { min: 2, max: 20, message: '昵称长度为 2~20 个字符', trigger: 'blur' },
    {
      pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_\-]+$/,
      message: '昵称只能包含中文、字母、数字、下划线和连字符',
      trigger: 'blur',
    },
  ],
  username: [
    { min: 3, max: 20, message: '用户名长度为 3~20 个字符', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9_]+$/,
      message: '用户名只能包含字母、数字和下划线',
      trigger: 'blur',
    },
  ],
  password: [
    { min: 8, max: 64, message: '密码长度为 8~64 个字符', trigger: 'blur' },
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)\S+$/,
      message: '密码必须包含至少一个字母和一个数字，且不能含有空格',
      trigger: 'blur',
    },
  ],
  email: [
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' },
  ],
}

/** 更新用户个人资料表单校验规则 */
export const updateUserProfileRules: FormRules = {
  nickname: [
    { min: 2, max: 20, message: '昵称长度为 2~20 个字符', trigger: 'blur' },
    {
      pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_\-]+$/,
      message: '昵称只能包含中文、字母、数字、下划线和连字符',
      trigger: 'blur',
    },
  ],
  password: [
    { min: 8, max: 64, message: '密码长度为 8~64 个字符', trigger: 'blur' },
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)\S+$/,
      message: '密码必须包含至少一个字母和一个数字，且不能含有空格',
      trigger: 'blur',
    },
  ],
}

// ==================== 角色 ====================

/** 创建角色表单校验规则 */
export const createRoleRules: FormRules = {
  code: [
    { required: true, message: '角色标识符不能为空', trigger: 'blur' },
    {
      pattern: /^[A-Za-z]+$/,
      message: '角色标识符只能包含英文字母',
      trigger: 'blur',
    },
  ],
  name: [
    { required: true, message: '角色名字不能为空', trigger: 'blur' },
    { min: 2, max: 24, message: '角色名字长度为 2~24 个字符', trigger: 'blur' },
  ],
  description: [],
}

/** 更新角色表单校验规则（所有字段均为可选） */
export const updateRoleRules: FormRules = {
  code: [
    {
      pattern: /^[A-Za-z]+$/,
      message: '角色标识符只能包含英文字母',
      trigger: 'blur',
    },
  ],
  name: [
    { min: 2, max: 24, message: '角色名字长度为 2~24 个字符', trigger: 'blur' },
  ],
  description: [],
}

// ==================== 权限 ====================

/** 更新权限表单校验规则 */
export const updatePermissionRules: FormRules = {
  name: [
    { min: 2, max: 24, message: '权限名字长度为 2~24 个字符', trigger: 'blur' },
  ],
  description: [],
}

// ==================== 标签 ====================

/** 创建标签表单校验规则 */
export const createTagRules: FormRules = {
  name: [
    { required: true, message: '标签名字不能为空', trigger: 'blur' },
    { min: 2, max: 24, message: '标签名字长度为 2~24 个字符', trigger: 'blur' },
  ],
  slug: [
    { required: true, message: '标签URL标识不能为空', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]+(-[a-z0-9]+)*$/,
      message: 'URL标识只能包含小写字母、数字，单词间用连字符分隔',
      trigger: 'blur',
    },
  ],
}

/** 更新标签表单校验规则 */
export const updateTagRules: FormRules = {
  name: [
    { min: 2, max: 24, message: '标签名字长度为 2~24 个字符', trigger: 'blur' },
  ],
  slug: [
    {
      pattern: /^[a-z0-9]+(-[a-z0-9]+)*$/,
      message: 'URL标识只能包含小写字母、数字，单词间用连字符分隔',
      trigger: 'blur',
    },
  ],
}

// ==================== 分类 ====================

/** 创建分类表单校验规则 */
export const createCategoriesRules: FormRules = {
  name: [
    { required: true, message: '分类名字不能为空', trigger: 'blur' },
    { min: 2, max: 24, message: '分类名字长度为 2~24 个字符', trigger: 'blur' },
  ],
  slug: [
    { required: true, message: '分类URL标识不能为空', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]+(-[a-z0-9]+)*$/,
      message: 'URL标识只能包含小写字母、数字，单词间用连字符分隔',
      trigger: 'blur',
    },
  ],
}

/** 更新分类表单校验规则 */
export const updateCategoriesRules: FormRules = {
  name: [
    { min: 2, max: 24, message: '分类名字长度为 2~24 个字符', trigger: 'blur' },
  ],
  slug: [
    {
      pattern: /^[a-z0-9]+(-[a-z0-9]+)*$/,
      message: 'URL标识只能包含小写字母、数字，单词间用连字符分隔',
      trigger: 'blur',
    },
  ],
}

// ==================== 文章 ====================

/** 文章状态枚举 */
export const ARTICLE_STATUS = ['DRAFT', 'PUBLISHED', 'ARCHIVED'] as const
export type ArticleStatus = (typeof ARTICLE_STATUS)[number]

/** 创建文章表单校验规则 */
export const createArticleRules: FormRules = {
  title: [
    { required: true, message: '文章标题不能为空', trigger: 'blur' },
    { max: 24, message: '文章标题最多 24 个字符', trigger: 'blur' },
  ],
  slug: [
    { required: true, message: '文章URL标识不能为空', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]+(-[a-z0-9]+)*$/,
      message: 'URL标识只能包含小写字母、数字，单词间用连字符分隔',
      trigger: 'blur',
    },
  ],
  content: [
    { required: true, message: '文章内容不能为空', trigger: 'blur' },
  ],
  categoryId: [
    { required: true, message: '请选择文章分类', trigger: 'change' },
    { type: 'number', message: '文章分类格式不正确', trigger: 'change' },
  ],
  tagIds: [
    { required: true, message: '请选择至少一个标签', trigger: 'change' },
    { type: 'array', message: '标签格式不正确', trigger: 'change' },
  ],
}

/** 更新文章表单校验规则 */
export const updateArticleRules: FormRules = {
  title: [
    { max: 24, message: '文章标题最多 24 个字符', trigger: 'blur' },
  ],
  slug: [
    {
      pattern: /^[a-z0-9]+(-[a-z0-9]+)*$/,
      message: 'URL标识只能包含小写字母、数字，单词间用连字符分隔',
      trigger: 'blur',
    },
  ],
  articleStatus: [
    {
      validator: (_rule, value, callback) => {
        if (value && !ARTICLE_STATUS.includes(value)) {
          callback(new Error('文章状态值不合法'))
        } else {
          callback()
        }
      },
      trigger: 'change',
    },
  ],
}

/** 批量更新文章状态表单校验规则 */
export const updateArticleStatusRules: FormRules = {
  articleIds: [
    { required: true, message: '文章ID列表不能为空', trigger: 'change' },
    { type: 'array', message: '文章ID格式不正确', trigger: 'change' },
  ],
  articleStatus: [
    { required: true, message: '文章状态不能为空', trigger: 'change' },
    {
      validator: (_rule, value, callback) => {
        if (!ARTICLE_STATUS.includes(value)) {
          callback(new Error('文章状态值不合法'))
        } else {
          callback()
        }
      },
      trigger: 'change',
    },
  ],
}

// ==================== 评论 ====================

/** 创建评论表单校验规则 */
export const createCommentRules: FormRules = {
  content: [
    { required: true, message: '评论内容不能为空', trigger: 'blur' },
  ],
  parentCommentId: [
    { type: 'number', message: '父级评论ID格式不正确', trigger: 'change' },
  ],
}

/** 更新评论表单校验规则 */
export const updateCommentRules: FormRules = {
  content: [
    { required: false, message: '评论内容不能为空', trigger: 'blur' },
  ],
}
