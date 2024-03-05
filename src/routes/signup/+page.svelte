<script lang="ts">
	import { enhance } from '$app/forms';

	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<h1>Create an Account</h1>
<form method="POST" use:enhance>
	<label for="email">Email</label>
	<input name="email" id="email" /><br />
	<label for="password">Password</label>
	<input type="password" name="password" id="password" /><br />
	<button type="submit" class="btn variant-filled">Continue</button>
	<p>{form?.message ?? ''}</p>
</form>

<a href="/login">Have an account? Sign in</a>
