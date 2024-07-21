import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import ToS from '../views/ToS.vue';
import Home from '../views/Home.vue';
import ManageAccounts from '@/views/ManageAccounts.vue';
import ManageCourses from '@/views/ManageCourses.vue';
import ManageDownloads from '@/views/ManageDownloads.vue';
import ViewLogs from '@/views/ViewLogs.vue';
import Settings from '@/views/Settings.vue';
import RouterLayout from '@/layouts/RouterLayout.vue';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: RouterLayout,
      children: [
        {
          path: 'tos',
          name: 'tos',
          component: ToS
        },
        {
          path: 'home',
          name: 'Home',
          component: Home,
          meta: { requiresConsent: true,
           }
        },
        {
          path: 'manage-accounts',
          name: 'manage-accounts',
          component: ManageAccounts,
          meta: { requiresConsent: true,
           }
        },
        {
          path: 'manage-courses',
          name: 'manage-courses',
          component: ManageCourses,
          meta: { requiresConsent: true,
           }
        },
        {
          path: 'manage-downloads',
          name: 'manage-downloads',
          component: ManageDownloads,
          meta: { requiresConsent: true,
           }
        },
        {
          path: 'view-logs',
          name: 'view-logs',
          component: ViewLogs,
          meta: { requiresConsent: true,
           }
        },
        {
          path: 'settings',
          name: 'settings',
          component: Settings,
          //meta: { requiresConsent: true,
          // }
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  // Verifica se o usuário está tentando acessar a página de ToS diretamente
  if (to.name === 'tos') {
    next(); // Permite o acesso à página de ToS
  } else {
    // Verifica se o usuário não aceitou os Termos de Serviço
    if (!store.getters.requiresConsent) {
      // Redireciona para a página de Termos de Serviço se não estivermos já tentando ir para lá
      next({ name: 'tos' });
    } else {
      next(); // Se o consentimento já foi dado, prossegue com a navegação
    }
  }
});

export default router;
