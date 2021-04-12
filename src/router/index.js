import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

const Colors = () => import('@/views/theme/Colors')
const Typography = () => import('@/views/theme/Typography')

const Charts = () => import('@/views/charts/Charts')
const Widgets = () => import('@/views/widgets/Widgets')

// Views - Components
const Cards = () => import('@/views/base/Cards')
const Forms = () => import('@/views/base/Forms')
const Switches = () => import('@/views/base/Switches')
const Tables = () => import('@/views/base/Tables')
const Tabs = () => import('@/views/base/Tabs')
const Breadcrumbs = () => import('@/views/base/Breadcrumbs')
const Carousels = () => import('@/views/base/Carousels')
const Collapses = () => import('@/views/base/Collapses')
const Jumbotrons = () => import('@/views/base/Jumbotrons')
const ListGroups = () => import('@/views/base/ListGroups')
const Navs = () => import('@/views/base/Navs')
const Navbars = () => import('@/views/base/Navbars')
const Paginations = () => import('@/views/base/Paginations')
const Popovers = () => import('@/views/base/Popovers')
const ProgressBars = () => import('@/views/base/ProgressBars')
const Tooltips = () => import('@/views/base/Tooltips')

// Views - Buttons
const StandardButtons = () => import('@/views/buttons/StandardButtons')
const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
const Dropdowns = () => import('@/views/buttons/Dropdowns')
const BrandButtons = () => import('@/views/buttons/BrandButtons')

// Views - Icons
const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')
const Brands = () => import('@/views/icons/Brands')
const Flags = () => import('@/views/icons/Flags')

// Views - Notifications
const Alerts = () => import('@/views/notifications/Alerts')
const Badges = () => import('@/views/notifications/Badges')
const Modals = () => import('@/views/notifications/Modals')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')

// Users
// const Users = () => import('@/views/users/Users')
// const User = () => import('@/views/users/User')
// const UserList = () => import('@/views/admin/UserList')
// const User = () => import('@/views/admin/User')

const CustomPage = () => import('@/views/theme/CustomPage')

const Activity = () => import('@/views/admin/Activity')
const ActivityList = () => import('@/views/admin/ActivityList')

const Campaign = () => import('@/views/admin/Campaign')
const CampaignList = () => import('@/views/admin/CampaignList')


const Business = () => import('@/views/admin/Business')
const BusinessList = () => import('@/views/admin/BusinessList')

const Advertiser = () => import('@/views/admin/Advertiser')
const AdvertiserList = () => import('@/views/admin/AdvertiserList')

const Image = () => import('@/views/admin/AdsImage')
const ImageList = () => import('@/views/admin/AdsImageList')

const Profile = () => import('@/views/admin/Profile')
const ProfileList = () => import('@/views/admin/ProfileList')

const Audience = () => import('@/views/admin/Audience')
const AudienceList = () => import('@/views/admin/AudienceList')


const Notification = () => import('@/views/other/Notification')


Vue.use(Router)

const router = new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  // mode: 'history',
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

router.beforeEach((to, from, next) => {
  var isAuth = auth.check();
  console.log(isAuth)
  if (to.name !== 'Login' && !isAuth) {
    next({ name: 'Login' })
  }
  else
    next();
  // if (to.name !== 'Login' && !auth.check()) next({ name: 'Login' })
  // else next()
})


// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.middlewareAuth)) {
//     if (!auth.check()) {
//       next({
//         path: '/pages/login',
//         // query: { redirect: to.fullPath }
//       });

//       return;
//     }
//   }
//   next()
// })

export default router

function configRoutes() {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',

      component: TheContainer,
      meta: { middlewareAuth: true },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'admin',
          redirect: '/admin/activity',
          name: 'Admin',
          component: {
            render(c) { return c('router-view') }
          },
          children: [

            {
              path: 'activity/:id',
              name: 'Activity',
              component: Activity
            },
            {
              path: 'activity',
              name: 'Activity',
              component: Activity
            },
            {
              path: 'activitylist',
              name: 'ActivityList',
              component: ActivityList
            },
            {
              path: 'campaign',
              name: 'Campaign',
              component: Campaign
            },
            {
              path: 'campaign/:id',
              name: 'Campaign',
              component: Campaign
            },
            {
              path: 'campaign/:id/advertiser/:advertiserId',
              name: 'Campaign',
              component: Campaign
            },
            {
              path: 'campaignlist',
              name: 'CampaignList',
              component: CampaignList
            },
            {
              path: 'advertiserList',
              name: 'AdvertiserList',
              component: AdvertiserList
            },
            {
              path: 'advertiser',
              name: 'Advertiser',
              component: Advertiser
            },
            {
              path: 'advertiser/:id',
              name: 'Advertiser',
              component: Advertiser
            },
            {
              path: 'advertiser/:id/profile/:profileId/email/:profileEmail',
              name: 'Advertiser',
              component: Advertiser
            },
            {
              path: 'businesslist',
              name: 'BusinessList',
              component: BusinessList
            },
            {
              path: 'business',
              name: 'Business',
              component: Business
            },
            {
              path: 'business/:id',
              name: 'Business',
              component: Business
            },
            {
              path: 'imageList',
              name: 'ImageList',
              component: ImageList
            },
            {
              path: 'image',
              name: 'Image',
              component: Image
            },
            {
              path: 'image/:id',
              name: 'Image',
              component: Image
            },
            {
              path: 'profile',
              name: 'Profile',
              component: Profile
            },
            {
              path: 'profile/:id',
              name: 'Profile',
              component: Profile
            },
            {
              path: 'profilelist',
              name: 'ProfileList',
              component: ProfileList
            },
            {
              path: 'audience',
              name: 'Audience',
              component: Audience
            },
            {
              path: 'audience/:id',
              name: 'Audience',
              component: Audience
            }, {
              path: 'audiencelist',
              name: 'AudienceList',
              component: AudienceList
            },

          ]
        },
        {
          path: 'other',
          redirect: '/other/notification',
          name: 'Other',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'notification',
              name: 'Notification',
              component: Notification
            }
          ]
        },
        {
          path: 'theme',
          redirect: '/theme/colors',
          name: 'Theme',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'custompage',
              name: 'CustomPage',
              component: CustomPage
            },
            {
              path: 'colors',
              name: 'Colors',
              component: Colors
            },
            {
              path: 'typography',
              name: 'Typography',
              component: Typography
            }
          ]
        },
        {
          path: 'charts',
          name: 'Charts',
          component: Charts
        },
        {
          path: 'widgets',
          name: 'Widgets',
          component: Widgets
        },
        // {
        //   path: 'users',
        //   meta: {
        //     label: 'Users'
        //   },
        //   component: {
        //     render(c) {
        //       return c('router-view')
        //     }
        //   },
        //   children: [
        //     {
        //       path: '',
        //       name: 'Users',
        //       component: Users
        //     },
        //     {
        //       path: ':id',
        //       meta: {
        //         label: 'User Details'
        //       },
        //       name: 'User',
        //       component: User
        //     }
        //   ]
        // },
        {
          path: 'base',
          redirect: '/base/cards',
          name: 'Base',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'cards',
              name: 'Cards',
              component: Cards
            },
            {
              path: 'forms',
              name: 'Forms',
              component: Forms
            },
            {
              path: 'switches',
              name: 'Switches',
              component: Switches
            },
            {
              path: 'tables',
              name: 'Tables',
              component: Tables
            },
            {
              path: 'tabs',
              name: 'Tabs',
              component: Tabs
            },
            {
              path: 'breadcrumbs',
              name: 'Breadcrumbs',
              component: Breadcrumbs
            },
            {
              path: 'carousels',
              name: 'Carousels',
              component: Carousels
            },
            {
              path: 'collapses',
              name: 'Collapses',
              component: Collapses
            },
            {
              path: 'jumbotrons',
              name: 'Jumbotrons',
              component: Jumbotrons
            },
            {
              path: 'list-groups',
              name: 'List Groups',
              component: ListGroups
            },
            {
              path: 'navs',
              name: 'Navs',
              component: Navs
            },
            {
              path: 'navbars',
              name: 'Navbars',
              component: Navbars
            },
            {
              path: 'paginations',
              name: 'Paginations',
              component: Paginations
            },
            {
              path: 'popovers',
              name: 'Popovers',
              component: Popovers
            },
            {
              path: 'progress-bars',
              name: 'Progress Bars',
              component: ProgressBars
            },
            {
              path: 'tooltips',
              name: 'Tooltips',
              component: Tooltips
            }
          ]
        },
        {
          path: 'buttons',
          redirect: '/buttons/standard-buttons',
          name: 'Buttons',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'standard-buttons',
              name: 'Standard Buttons',
              component: StandardButtons
            },
            {
              path: 'button-groups',
              name: 'Button Groups',
              component: ButtonGroups
            },
            {
              path: 'dropdowns',
              name: 'Dropdowns',
              component: Dropdowns
            },
            {
              path: 'brand-buttons',
              name: 'Brand Buttons',
              component: BrandButtons
            }
          ]
        },
        {
          path: 'icons',
          redirect: '/icons/coreui-icons',
          name: 'CoreUI Icons',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'coreui-icons',
              name: 'Icons library',
              component: CoreUIIcons
            },
            {
              path: 'brands',
              name: 'Brands',
              component: Brands
            },
            {
              path: 'flags',
              name: 'Flags',
              component: Flags
            }
          ]
        },
        {
          path: 'notifications',
          redirect: '/notifications/alerts',
          name: 'Notifications',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'alerts',
              name: 'Alerts',
              component: Alerts
            },
            {
              path: 'badges',
              name: 'Badges',
              component: Badges
            },
            {
              path: 'modals',
              name: 'Modals',
              component: Modals
            }
          ]
        }
      ]
    },
    {
      path: '*',
      name: 'Page404',
      component: Page404
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render(c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    }
  ]
}

