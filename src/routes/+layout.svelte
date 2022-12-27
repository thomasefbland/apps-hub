<script>
	import '../styles/global.postcss';

	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.data.title ? 'AppsHub • ' + $page.data.title : 'Apps Hub'}</title>
</svelte:head>

<nav>
	<div class="container">
		<div class="container_content">
			<a href="/apps" class="home_button">
				<svg class="icon" width="100%" height="100%" viewBox="0 0 55 55">
					<path d="m25 9.0937l-17.719 16.281h5.563v15.531h24.312v-15.531h5.563l-17.719-16.281z" />
				</svg>
				<span class="logo">AppsHub</span>
			</a>
		</div>
	</div>
</nav>
<slot />
