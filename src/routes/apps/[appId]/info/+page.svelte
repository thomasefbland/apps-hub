<script lang="ts">
	import '../../../../styles/apps/info.postcss';

	import { error } from '@sveltejs/kit';
	import type { PageData } from './$types';

	export let data: PageData;

	if (data.appinfo == null) throw error(500, 'Could not load data');

	let appinfo = data.appinfo;
	let shortcut = appinfo.shortcut ? data.shortcutsinfo.find((shortcut) => shortcut.id === appinfo.shortcut) : null;
</script>

<main>
	<div class="app_info_container">
		<div class="app_info_content">
			<h1>{appinfo.name}</h1>
			<div class="info_wrapper">
				<img src="/{appinfo.logo}" alt={`${appinfo.name} Logo`} />
				<div class="details">
					<span><strong>Description:</strong> {appinfo.description}</span>
					<span><strong>Version:</strong> {appinfo.version}</span>
					<span><strong>Updated:</strong> {appinfo.update_date}</span>
					<span><strong>Release Date:</strong> {appinfo.release_date}</span>
				</div>
			</div>
			{#if shortcut}
				<div class="shortcut_content">
					<h5 class="heading">App Shortcut</h5>
					<a class="details" href="/shortcuts/{shortcut.id}">
						<img src="/{shortcut.logo}" alt={`${shortcut.name} Logo`} />
						<h4>{shortcut.name}</h4>
					</a>
				</div>
			{/if}
		</div>
	</div>
</main>
