<?php

namespace App\Http\Middleware;

use App\Models\PostCategory;
use App\Settings\SiteSettings;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'banks' =>  [
                    'vcb' => 'Vietcombank',
                    'tcb' => 'Techcombank',
                    'bidv' => 'BIDV',
                    'vtb' => 'Vietinbank',
                    'acb' => 'ACB',
                    'mb' => 'MB',
                    'vpb' => 'VPBank',
                    'agb' => 'Agribank',
                    'shb' => 'SHB',
                    'hdb' => 'HDBank',
                    'nab' => 'NAB',
                    'vib' => 'VIB',
                    'seab' => 'SeABank',
                    'bacab' => 'BacABank',
                    'oceanb' => 'OceanBank',
                    'pgb' => 'PGBank',
                    'lvpb' => 'LienVietPostBank',
                    'tpb' => 'TPBank',
                    'bvb' => 'BVB',
                    'abb' => 'ABBank',
                    'ocb' => 'OCB',
                    'bvb' => 'BaoVietBank',
                    'nab' => 'NamABank',
                ],
            'site_settings' => (new SiteSettings())->toArray(),
            'blog_categories' => PostCategory::orderBy('name')->get(),
            'app_url' => config('app.url')
        ];
    }
}
