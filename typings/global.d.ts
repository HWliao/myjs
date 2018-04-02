declare module '*.svg';
declare module '*.png';
declare module 'react-syntax-highlighter/prism';

declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  Intl: any;
}

declare interface NodeModule {
  hot: { accept: (p1: any, p2: any) => any };
}

declare interface LoginPort {
  /**
   * 登录的设备类型
   */
  type: string;
  /**
   * 登录设备的操作系统
   */
  os: string;
  /**
   * 登录设备的 mac 地址
   */
  mac: string;
  /**
   * 登录设备ID, uuid
   */
  deviceId: string;
  /**
   * 登录的帐号
   */
  account: string;

  /**
   * 登录设备的连接号
   */
  connectionId: number;

  /**
   * 登录的服务器 IP
   */
  ip: string;
  /**
   * 登录时间
   */
  time: number;

  /**
   * 是否在线
   */
  online: boolean;
}

declare interface NIMError {
  /**
   * 错误消息
   */
  message: string;
  /**
   * 错误码
   */
  code: number;

  /**
   * 错误事件
   */
  event: any;
}

declare interface NimFriend {
  /**
   * 账号
   */
  account: string;
  /**
   * 昵称
   */
  alias: string;

  /**
   * 扩展字段, 开发者可以自行扩展, 建议封装成JSON格式字符串
   */
  custom: string;
  /**
   * 成为好友的时间
   */
  createTime: string;

  /**
   * 更新时间
   */
  updateTime: string;

}

declare interface NimUser {
  /**
   * 账号
   */
  account: string;
  /**
   * 昵称
   */
  nick: string;
  /**
   * 头像
   */
  avatar: string;
  /**
   * 签名
   */
  sign: string;
  /**
   * 性别
   */
  gender: string;
  /**
   * 邮箱
   */
  email: string;
  /**
   * 生日
   */
  birth: string;
  /**
   * 电话号码
   */
  tel: string;
  /**
   * 扩展字段
   * 推荐使用JSON格式构建, 非JSON格式的话, Web端会正常接收, 但是会被其它端丢弃
   */
  custom: string;

  /**
   * 创建时间
   */
  createTime: number;

  /**
   * 更新时间
   */
  updateTime: number;
}

interface NimTeam {
  /**
   * 群Id
   */
  teamId: string;

  /**
   * 群类型
   */
  type: string;

  /**
   * 群名字
   */
  name: string;
  /**
   * 群头像
   */
  avatar: string;
  /**
   * 群简介
   */
  intro: string;
  /**
   * 群公告
   */
  announcement: string;
  /**
   * 群加入方式, 仅限高级群
   */
  joinMode: string;
  /**
   * 群被邀请模式, 仅限高级群
   */
  beInviteMode: string;
  /**
   * 群邀请模式, 仅限高级群
   */
  inviteMode: string;
  /**
   * 群信息修改权限, 仅限高级群
   */
  updateTeamMode: string;
  /**
   * 群信息自定义字段修改权限, 仅限高级群
   */
  updateCustomMode: string;
  /**
   * 群主
   */
  owner: string;
  /**
   * 群人数上限
   */
  level: number;
  /**
   * 群成员数量
   */
  memberNum: number;
  /**
   * 群成员最后更新时间
   */
  memberUpdateTime: number;
  /**
   * 群创建时间
   */
  createTime: number;
  /**
   * 群最后更新时间
   */
  updateTime: number;
  /**
   * 第三方扩展字段, 开发者可以自行扩展, 建议封装成JSON格式字符串
   */
  custom: string;
  /**
   * 第三方服务器扩展字段, 开发者可以自行扩展, 建议封装成JSON格式字符串
   */
  serverCustom: string;
  /**
   * 是否有效, 解散后该群无效
   */
  valid: boolean;

  /**
   * 该群是否对当前用户有效, 如果无效, 那么说明被踢了
   */
  validToCurrentUser: boolean;

  /**
   * 是否禁言, 禁言状态下普通成员不能发送消息, 创建者和管理员可以发送消息
   */
  mute: boolean;
}

declare interface NimOptions {
  /**
   *   是否开启调试, 如果开启调试, 将会在控制台输出一些log。默认false不输出日志, 可以传true来开启日志。
   */
  debug?: boolean;
  /**
   *   是否对日志做额外的处理，诸如日志存储、日志上报等等，该函数会截获console日志的参数，供开发者使用
   */
  logFunc?: (obj: any) => void;
  /**
   *   secure 模式下会通过 https 协议跟服务器建立连接, 非 secure 模式下会通过 http 协议跟服务器建立连接, 默认 true
   */
  secure?: boolean;
  /**
   *   在云信管理后台查看应用的 appKey
   */
  appKey: string;
  /**
   * 帐号, 应用内唯一
   */
  account: string;

  /**
   * 帐号的 token, 用于建立连接
   */
  token: string;
  /**
   * 连接建立后的回调, 会传入一个对象, 包含登录的信息, 有以下字段
   * lastLoginDeviceId: 上次登录的设备的设备号
   * connectionId: 本次登录的连接号
   * ip: 客户端IP
   * port: 客户端端口
   * country: 本次登录的国家
   */
  onconnect?: (loginPort: LoginPort) => void;
  /**
   * 即将重连的回调
   * 此时说明 SDK 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
   * 此回调会收到一个对象, 包含额外的信息, 有以下字段
   * duration: 距离下次重连的时间
   * retryCount: 重连尝试的次数
   */
  onwillreconnect?: (obj: { duration: number, retryCount: number }) => void;
  /**
   *  断开连接后的回调
   *
   * 此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
   * 此回调会收到一个对象, 包含错误的信息, 有以下字段
   * code: 出错时的错误码, 可能为空
   * 302: 账号或者密码错误, 请跳转到登录页面并提示错误
   * 417: 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
   * 'kicked': 被踢
   * 当code为'kicked'的时候, 此对象会有以下字段
   * reason: 被踢的原因
   * samePlatformKick: 不允许同一个帐号在多个地方同时登录
   * serverKick: 被服务器踢了
   * otherPlatformKick: 被其它端踢了
   * message: 文字描述的被踢的原因
   */
  ondisconnect?: () => void;

  /**
   * 发生错误的回调, 会传入错误对象
   */
  onerror?: (error: NIMError) => void;

  /**
   * 多端登录状态变化的回调, 会收到登录端列表, 以下情况会收到此回调
   * 登录时其它端在线
   * 登录后其它端上线或者下线
   */
  onloginportschange?: (loginPort: LoginPort) => void;

  /**
   *   是否同步黑名单和静音列表, 默认true. 如果传false就收不到黑名单和静音列表, 即不会收到onblacklist回调和onmutelist回调, 开发者后续可以调用获取黑名单和静音列表来获取黑名单和静音列表。
   */
  syncRelations?: boolean;
  /**
   * 同步黑名单的回调, 会传入黑名单列表blacklist
   * blacklist的属性invalid包含被删除的黑名单列表
   * 此回调是增量回调, 可以调用nim.mergeRelations和nim.cutRelations来合并数据
   */
  onblacklist?: (obj: any) => void;
  /**
   * 当前登录用户在其它端加入黑名单/从黑名单移除后的回调, 会传入一个参数, 包含两个字段
   * account: 要加入黑名单/从黑名单移除的账号
   * isAdd: true表示加入黑名单, false表示从黑名单移除
   */
  onsyncmarkinblacklist?: (obj: { account: string, isAdd: boolean }) => void;
  /**
   * 同步静音列表的回调, 会传入静音列表mutelist
   * mutelist的属性invalid包含被删除的静音列表
   * 此回调是增量回调, 可以调用nim.mergeRelations和nim.cutRelations来合并数据
   */
  onmutelist?: (obj: any) => void;
  /**
   * 当前登录用户在其它端加入静音列表/从静音列表移除后的回调, 会传入一个参数, 包含两个字段
   * account: 要加入黑名单/从黑名单移除的账号
   * isAdd: true表示加入静音列表, false表示从静音列表移除
   */
  onsyncmarkinmutelist?: (obj: { account: string, isAdd: boolean }) => void;
  /**
   * 是否同步好友列表, 默认true. 如果传false就收不到onfriends回调, 开发者后续可以调用获取好友列表来获取好友列表。
   */
  syncFriends?: boolean;
  /**
   * 同步好友列表的回调, 会传入好友列表
   */
  onfriends?: (friends: NimFriend[]) => void;
  /**
   * 当前登录用户在其它端进行好友相关的操作后的回调
   * 操作包括
   * 直接加为好友
   * 申请加为好友
   * 通过好友申请
   * 拒绝好友申请
   * 删除好友
   * 更新好友
   * 此回调会收到一个参数obj, 它有一个字段type的值为操作的类型, 具体类型如下：
   * 'addFriend' (直接加为好友), 此时obj的字段如下:
   * account的值为被直接加为好友的账号
   * friend为被直接加为好友的好友对象
   * ps为附言
   * 'applyFriend' (申请加为好友), 此时obj的字段如下:
   * account的值为被申请加为好友的账号
   * ps为附言
   * 'passFriendApply' (通过好友申请), 此时obj的字段如下:
   * account的值为被通过好友申请的账号
   * friend为被通过好友申请的好友对象
   * ps为附言
   * 'rejectFriendApply' (拒绝好友申请), 此时obj的字段如下:
   * account的值为被拒绝好友申请的账号
   * ps为附言
   * 'deleteFriend' (删除好友), 此时obj的字段如下:
   * account的值为被删除好友的账号
   * 'updateFriend' (更新好友), 此时obj的字段如下:
   *  friend的值为被更新的好友对象
   */
  onsyncfriendaction?: (obj: { type: string, account: string, friend: NimFriend, ps: string }) => void;
  /**
   * 同步登录用户名片的回调, 会传入用户名片
   */
  onmyinfo?: (user: NimUser) => void;

  /**
   * 当前登录用户在其它端修改自己的个人名片之后的回调, 会传入用户名片
   */
  onupdatemyinfo?: (user: NimUser) => void;

  /**
   * 是否同步好友对应的用户名片列表, 默认true, 如果传false就收不到onusers回调.
   */
  syncFriendUsers?: boolean;

  /**
   * 同步好友用户名片的回调, 会传入用户名片数组
   */
  onusers?: (users: NimUser[]) => void;
  /**
   * 用户名片更新后的回调, 会传入用户名片
   */
  onupdateuser?: (user: NimUser) => void;
  /**
   * 是否同步群列表, 默认true. 如果传false就收不到群列表, 即不会收到onteams回调, 开发者后续可以调用获取群列表来获取群列表.
   */
  syncTeams?: boolean;
  /**
   * 是否同步额外的群信息, 默认true会同步额外的群信息, 目前包括
   * 当前登录用户是否开启某个群的消息提醒 (SDK 只是存储了此信息, 具体用此信息来做什么事情完全由开发者控制)
   * 调用接口NIM#updateInfoInTeam来关闭/开启某个群的消息提醒
   * 调用接口NIM#notifyForNewTeamMsg来查询是否需要群消息通知
   */
  syncExtraTeamInfo?: boolean;
  /**
   * 同步群列表的回调, 会传入群数组teams
   * teams的属性invalid包含退出的群
   */
  onteams?: (teams: NimTeam[]) => void;
  /**
   * 当前登录用户在其它端创建群后的回调, 会传入群对象
   */
  onsynccreateteam?: (team: NimTeam) => void;

  /**
   * 是否同步群成员, 默认true. 只有在syncTeams=true的时候才起作用,
   * 如果传false就不会同步群成员,
   * 即不会收到onteammembers和onsyncteammembersdone回调,
   * 开发者后续可以调用获取群成员来获取群成员.
   */
  syncTeamMembers?: boolean;
  /**
   * 同步群成员的回调, 一个群对应一个回调, 会传入群成员数组
   */
  onteammembers?: (obj: any) => void;
  /**
   * 当syncTeams和syncTeamMembers同时为true时, 会同步所有群的群成员, 当所有群的群成员同步结束时, 会调用此回调
   */
  onsyncteammembersdone?: (obj: any) => void;

  /**
   *   群成员信息更新后的回调, 会传入群成员对象, 不过此时的信息是不完整的, 只会包括被更新的字段。当前登录帐号在其它端修改自己在群里面的昵称时也会收到此回调。
   */
  onupdateteammember?: (obj: any) => void;
  /**
   * 创建群的回调, 此方法接收一个参数, 包含群信息和群主信息
   */
  onCreateTeam?: (obj: any) => void;

  /**
   * 更新群的回调, 此方法接收一个参数, 更新后的群信息
   */
  onUpdateTeam?: (obj: any) => void;
  /**
   * 新成员入群的回调, 此方法接收一个参数, 包含群信息和群成员信息
   */
  onAddTeamMembers?: (obj: any) => void;

  /**
   * 有人出群的回调, 此方法接收一个参数, 包含群信息和群成员账号
   */
  onRemoveTeamMembers?: (obj: any) => void;

  /**
   * 更新群管理员的回调, 此方法接收一个参数, 包含群信息和管理员信息
   */
  onUpdateTeamManagers?: (obj: any) => void;
  /**
   * 解散群的回调, 此方法接收一个参数, 包含被解散的群id
   */
  onDismissTeam?: (obj: any) => void;

  /**
   * 移交群的回调, 此方法接收一个参数, 包含群信息和新老群主信息
   */
  onTransferTeam?: (obj: any) => void;

  /**
   * 更新群成员禁言状态的回调, 此方法接收一个参数, 包含群信息和禁言状态信息
   */
  onUpdateTeamMembersMute?: (obj: any) => void;

  /**
   * 是否同步会话的未读数, 默认不同步
   * 如果选择同步
   * 那么在一个端读过的会话在其它端也会被标记为已读
   * 在调用NIM#setCurrSession的时候 SDK 会自动同步一次未读数, 此后如果收到当前会话的消息, 需要手动调用NIM#resetSessionUnread来同步未读数
   */
  syncSessionUnread?: boolean;
  /**
   * 同步最近会话列表回调, 会传入会话列表, 按时间正序排列, 即最近聊过天的放在列表的最后面。
   */
  onsessions?: (obj: any) => void;
  /**
   * 更新会话的回调, 会传入会话, 以下情况会收到此回调
   * 收到消息
   * 发送消息
   * 设置当前会话
   * 重置会话未读数
   */
  onupdatesession?: (obj: any) => void;
  /**
   * 是否要忽略某条通知类消息, 该方法会接收一个消息对象, 如果该方法返回 true, 那么 SDK 将忽略此条通知类消息
   */
  shouldIgnoreNotification?: (obj: any) => void;

  /**
   * 是否群通知消息记未读
   */
  shouldCountTeamNotifyUnread?: (obj: any) => void;

  /**
   * 是否同步漫游消息, 默认true. 如果传false就收不到漫游消息, 即不会收到onroamingmsgs回调.
   */
  syncRoamingMsgs?: boolean;
  /**
   * 同步漫游消息的回调, 每个会话对应一个回调, 会传入消息数组
   */
  onroamingmsgs?: (obj: any) => void;

  /**
   * 同步离线消息的回调, 每个会话对应一个回调, 会传入消息数组
   */
  onofflinemsgs?: (obj: any) => void;

  /**
   * 收到消息的回调, 会传入消息对象
   * 当前登录帐号在其它端发送消息之后也会收到此回调, 注意此时消息对象的from字段就是当前登录的帐号
   */
  onmsg?: (obj: any) => void;

  /**
   * 是否同步已读回执时间戳, 默认true. 如果传false就收不到已读回执时间戳.
   */
  syncMsgReceipts?: boolean;
  /**
   * 同步离线系统通知的回调, 会传入系统通知数组
   */
  onofflinesysmsgs?: (obj: any) => void;

  /**
   * 同步漫游系统通知的回调, 会传入系统通知数组
   */
  onroamingsysmsgs?: (obj: any) => void;

  /**
   * 收到系统通知的回调, 会传入系统通知
   */
  onsysmsg?: (obj: any) => void;
  /**
   * 更新系统通知后的回调, 会传入系统通知
   *
   * 以下情况会收到此回调
   * 通过好友申请
   * 拒绝好友申请
   * 接受入群邀请
   * 拒绝入群邀请
   * 通过入群申请
   * 拒绝入群申请
   * 这些操作的发起方会收到此回调, 接收被更新的系统通知, 根据操作的类型系统通知会被更新为下面两种状态
   * 'passed': 已通过
   * 'rejected': 已拒绝
   */
  onupdatesysmsg?: (obj: any) => void;

  /**
   * 收到系统通知未读数的回调
   *
   * SDK 会管理内建系统通知的未读数, 此回调接收的对象包括以下字段
   * total: 总共的未读数
   * friend: 所有跟好友相关的系统通知的未读数
   * addFriend: 直接加为好友的未读数
   * applyFriend: 申请加为好友的未读数
   * passFriendApply: 通过好友申请的未读数
   * rejectFriendApply: 拒绝好友申请的未读数
   * deleteFriend: 删除好友的未读数
   * team: 所有跟群相关的系统通知的未读数
   * teamInvite: 入群邀请的未读数
   * rejectTeamInvite: 接受入群邀请的未读数
   * applyTeam: 入群申请的未读数
   * rejectTeamApply: 拒绝入群申请的未读数
   */
  onsysmsgunread?: (obj: any) => void;
  /**
   * 更新系统通知未读数的回调
   */
  onupdatesysmsgunread?: (obj: any) => void;

  /**
   * 同步离线自定义系统通知的回调, 会传入系统通知数组
   */
  onofflinecustomsysmsgs?: (obj: any) => void;

  /**
   * 收到自定义系统通知的回调, 会传入系统通知
   */
  oncustomsysmsg?: (obj: any) => void;

  /**
   * 当上面各个同步（不包括下面的同步群成员）完成后,
   * 会调用此回调；注意, SDK保证在onsyncdone调用的时候上面的同步肯定完成了,
   * 但是不保证各个同步回调的顺序。
   */
  onsyncdone?: (obj: any) => void;
  /**
   * 是否自动标记消息为已收到
   * 默认情况下SDK在收到服务器推送过来的消息后, 会在将消息推给开发者时将消息标记为已读状态, 下次登录后就不会收到标记为已读的消息。
   * SDK通过onofflinemsgs、onofflinesysmsgs、onofflinecustomsysmsgs等回调将离线消息推送给开发者
   * SDK通过onmsg、onsysmsg、oncustomsysmsg等回调将在线消息推送给开发者
   * 如果开发者想控制标记消息为已收到的时机, 那么可以传false, 这样SDK就不会自动标记消息已读, 此时需要开发者在适当的时机调用相关的方法来标记消息为已读, 否则下次登录后还会收到未标记为已读的消息。
   * 调用标记系统通知已读来标记系统通知和自定义系统通知为已读状态
   */
  autoMarkRead?: boolean;
  /**
   * 是否使用数据库
   * 在支持数据库的浏览器上 SDK 会将数据缓存到数据库中, 后续同步都是增量更新, 加快初始化速度
   * 如果开发者不想使用数据库, 那么可以设置db为false来禁用数据库
   */
  db?: boolean;
}

/**
 * 云信实例
 */
declare interface NIM {
  /**
   * 建立连接
   */
  connect: () => void;
  /**
   * 断开连接
   */
  disconnect: () => void;
}
