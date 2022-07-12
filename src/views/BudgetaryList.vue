<template>
    <main>
        <Suspense>
            <template #default>
                <BudgetaryListAsync/>
            </template>
            <template #fallback>
                Proposal is loading... {{url}}
            </template>
        </Suspense>
    </main>
</template>

<script>
import BudgetaryListAsync from './BudgetaryListAsync'
export default {
    components: {
        BudgetaryListAsync,
    }

}
</script>