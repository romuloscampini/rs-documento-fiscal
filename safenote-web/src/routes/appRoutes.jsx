import Dashboard from '../views/Dashboard/Dashboard';
import DespesasList from '../views/DespesaList/Despesas';
import CompraForm from "../views/Pagamento/CompraForm";

const appRoutes = [
    {
        id: 'home',
        path: "/home",
        name: "Dashboard",
        icon: "pe-7s-graph",
        component: Dashboard
    },
    {
        id: 'expensesList',
        path: "/expenses/list",
        name: "Despesas",
        icon: "pe-7s-user",
        component: DespesasList
        // childrens: [
        //     {
        //         path: "/payment/new",
        //         name: "Cadastro de Despesas",
        //         icon: "pe-7s-note2",
        //         component: CompraForm,
        //         hideFromSidebar: true
        //     }
        // ]
    },
    {
        id: 'expensesNew',
        path: "/expenses/new",
        name: "Despesas",
        icon: "pe-7s-user",
        component: CompraForm,
        hideFromSidebar: true
        // childrens: [
        //     {
        //         path: "/payment/new",
        //         name: "Cadastro de Despesas",
        //         icon: "pe-7s-note2",
        //         component: CompraForm,
        //         hideFromSidebar: true
        //     }
        // ]
    },
    // {
    //     path: "/typography",
    //     name: "Typography",
    //     icon: "pe-7s-news-paper",
    //     component: Typography
    // },
    // { path: "/icons", name: "Icons", icon: "pe-7s-science", component: Icons },
    // { path: "/maps", name: "Maps", icon: "pe-7s-map-marker", component: Maps },
    // {
    //     path: "/notifications",
    //     name: "Notifications",
    //     icon: "pe-7s-bell",
    //     component: Notifications
    // },
    // {
    //     upgrade: true,
    //     path: "/upgrade",
    //     name: "Upgrade to PRO",
    //     icon: "pe-7s-rocket",
    //     component: Upgrade
    // },
    { redirect: true, path: "/", to: "/home", name: "Dashboard" }
];

export default appRoutes;
