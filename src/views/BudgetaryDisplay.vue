<template>
    <main>
        <Suspense>
            <template #default>
                <BudgetaryAsync :url="url"/>
            </template>
            <template #fallback>
                Proposal is loading... {{url}}
            </template>
        </Suspense>
    </main>
</template>

<script>
import BudgetaryAsync from './BudgetaryAsync'
export default {
    components: {
        BudgetaryAsync,
    },
    props: [
        'url',
    ],

}
</script>

<style>

</style>