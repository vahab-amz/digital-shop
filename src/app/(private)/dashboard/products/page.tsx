import ProductDashboardView from '@/modules/products/views/ProductDashboardView';
import React from 'react';

// baraye inke route khodemono tabdil konim be dynamic route ke bad az har refresh dade ha dobare fetch beshan va taghirati dadim lahaz beshan
// bayad havsemon bashe ke key bayad azin halat estefade konim ke caching ma az bein bere va dade haye jadid estafde konim baste be har senario farq mikone, pas deqat kon ke koja esteafde mikoni
// export const dynamic = 'force-dynamic';

// ya ham mitonim modele ISR render konim dade hamono (age yadet bshe ye chizi bod beyne SSR va SSG) va az revalidate estfede konim, ke dade hamon ye time cache shode bashe va bade ye modat dobare dade ha fetch beshan (in model, noe route maro avaz nemikone yani hamon static baghi mimanad)
export const revalidate = 30

function DashboardProductPage() {
    return (
        <div>
            <ProductDashboardView />
        </div>
    );
}

export default DashboardProductPage;
