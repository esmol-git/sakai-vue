<script setup>
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';

import { createProduct, delProduct, getProduct, getProducts, updateProduct } from '@/api/ProductService';

onMounted(() => {
    fetchProducts();
});

function fetchProducts() {
    const sortParam = sortField.value ? `${sortOrder.value === 1 ? '' : '-'}${sortField.value}` : null;
    getProducts({
        name: search.value,
        limit: rowsPerPage.value,
        page: currentPage.value,
        sortBy: sortParam
    }).then((data) => {
        products.value = data.data.items;
        total.value = data.data?.meta?.total_items;
    });
}

function fetchProduct() {
    const id = productId.value;
    getProduct(id).then((data) => {
        console.log('fetchProduct', data.data);
        statusSelected.value = data.data ? data.data.inventoryStatus : {};
        product.value = data.data;
    });
}

function onPageChange(event) {
    currentPage.value = event.page + 1; // PrimeVue paginator is zero-indexed
    fetchProducts();
}

function onSortChange(event) {
    sortField.value = event.sortField;
    sortOrder.value = event.sortOrder;
    fetchProducts();
}

async function addProduct() {
    await createProduct(product.value).then(() => {
        fetchProducts();
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    });
}
const currentPage = ref(1);
const rowsPerPage = ref(10);
const sortField = ref(null);
const sortOrder = ref(1);
const total = ref(0);
const search = ref('');
const productId = ref(null);
const statusSelected = ref();
const toast = useToast();
const dt = ref();
const products = ref();
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref();
const submitted = ref(false);
const statuses = ref([
    { label: 'INSTOCK', value: 'instock' },
    { label: 'LOWSTOCK', value: 'lowstock' },
    { label: 'OUTOFSTOCK', value: 'outofstock' }
]);

function formatCurrency(value) {
    if (value) return value.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' });
    return;
}

function openNew() {
    productId.value = null;
    product.value = {};
    submitted.value = false;
    statusSelected.value = '';
    productDialog.value = true;
}

function hideDialog() {
    productId.value = null;
    productDialog.value = false;
    submitted.value = false;
}

function saveProduct() {
    submitted.value = true;
    if (product?.value.name?.trim()) {
        if (product.value.id) {
            product.value.inventoryStatus = statusSelected.value;
            const payload = { ...product.value };
            updateProduct(product.value.id, payload).then(() => {
                fetchProducts();
                toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                productDialog.value = false;
            });
        } else {
            product.value = {
                code: createId(),
                name: product.value.name,
                description: product.value.description,
                image: 'product-placeholder.svg',
                inventoryStatus: product.value.inventoryStatus,
                price: product.value.price,
                quantity: product.value.quantity,
                rating: Math.floor(Math.random() * 6),
                category: product.value.category
            };
            addProduct(product.value).then(() => {
                productDialog.value = false;
                product.value = {};
            });
        }
    }
}

function editProduct(prod) {
    productId.value = prod.id;
    fetchProduct();
    productDialog.value = true;
}

function confirmDeleteProduct(prod) {
    product.value = prod;
    deleteProductDialog.value = true;
}

function deleteProduct() {
    delProduct(product.value.id).then(() => {
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        fetchProducts();
        deleteProductDialog.value = false;
        product.value = {};
    });
}

function createId() {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

function exportCSV() {
    dt.value.exportCSV();
}

function confirmDeleteSelected() {
    deleteProductsDialog.value = true;
}

function deleteSelectedProducts() {
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
}

function getStatusLabel(status) {
    switch (status) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warn';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
}

function searchProducts() {
    fetchProducts();
}
</script>

<template>
    <div>
        <div class="card">
            <ProgressBar v-if="!products" mode="indeterminate" style="height: 4px"></ProgressBar>
            <div v-else>
                <Toolbar class="mb-6">
                    <template #start>
                        <Button label="New" icon="pi pi-plus" severity="secondary" class="mr-2" @click="openNew" />
                        <Button label="Delete" icon="pi pi-trash" severity="secondary" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                    </template>

                    <template #end>
                        <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
                    </template>
                </Toolbar>

                <DataTable ref="dt" v-model:selection="selectedProducts" :value="products" dataKey="id" :rows="10" @sort="onSortChange" :sortField="sortField" :sortOrder="sortOrder">
                    <template #header>
                        <div class="flex flex-wrap gap-2 items-center justify-between">
                            <h4 class="m-0">Manage Products</h4>
                            <IconField>
                                <InputIcon>
                                    <i class="pi pi-search" />
                                </InputIcon>
                                <InputText v-model="search" @input="searchProducts" placeholder="Search..." />
                            </IconField>
                        </div>
                    </template>

                    <template #empty> No customers found. </template>
                    <template #loading> Loading customers data. Please wait. </template>

                    <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                    <Column field="code" header="Code" sortable style="min-width: 12rem"></Column>
                    <Column field="name" header="Name" sortable style="min-width: 16rem"></Column>
                    <Column header="Image">
                        <template #body="slotProps">
                            <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`" :alt="slotProps.data.image" class="rounded" style="width: 64px" />
                        </template>
                    </Column>
                    <Column field="price" header="Price" sortable style="min-width: 8rem">
                        <template #body="slotProps">
                            {{ formatCurrency(slotProps.data.price) }}
                        </template>
                    </Column>
                    <Column field="category" header="Category" sortable style="min-width: 10rem"></Column>
                    <Column field="rating" header="Reviews" sortable style="min-width: 12rem">
                        <template #body="slotProps">
                            <Rating :modelValue="slotProps.data.rating" :readonly="true" />
                        </template>
                    </Column>
                    <Column field="inventoryStatus" header="Status" style="min-width: 12rem">
                        <template #body="slotProps">
                            <Tag
                                :value="slotProps.data && slotProps.data.inventoryStatus ? slotProps.data.inventoryStatus.label : ''"
                                :severity="getStatusLabel(slotProps.data && slotProps.data.inventoryStatus.label ? slotProps.data.inventoryStatus.label : '')"
                            />
                        </template>
                    </Column>
                    <Column :exportable="false" style="min-width: 12rem">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
                            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>
                <Paginator v-if="total > rowsPerPage" :rows="rowsPerPage" :totalRecords="total" :first="(currentPage - 1) * rowsPerPage" @page="onPageChange" template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"></Paginator>
            </div>
        </div>

        <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Product Details" :modal="true">
            {{ selectedProducts }}
            <div class="flex flex-col gap-6">
                <img v-if="product.image" :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`" :alt="product.image" class="block m-auto pb-4" />
                <div>
                    <label for="name" class="block font-bold mb-3">Name</label>
                    <InputText id="name" v-model.trim="product.name" required="true" autofocus :invalid="submitted && !product.name" fluid />
                    <small v-if="submitted && !product.name" class="text-red-500">Name is required.</small>
                </div>
                <div>
                    <label for="description" class="block font-bold mb-3">Description</label>
                    <Textarea id="description" v-model="product.description" required="true" rows="3" cols="20" fluid />
                </div>
                <div>
                    <label for="inventoryStatus" class="block font-bold mb-3">Inventory Status</label>
                    <Select id="inventoryStatus" v-model="statusSelected" :options="statuses" optionLabel="label" placeholder="Select a Status" fluid></Select>
                </div>

                <div>
                    <span class="block font-bold mb-4">Category</span>
                    <div class="grid grid-cols-12 gap-4">
                        <div class="flex items-center gap-2 col-span-6">
                            <RadioButton id="category1" v-model="product.category" name="category" value="Accessories" />
                            <label for="category1">Accessories</label>
                        </div>
                        <div class="flex items-center gap-2 col-span-6">
                            <RadioButton id="category2" v-model="product.category" name="category" value="Clothing" />
                            <label for="category2">Clothing</label>
                        </div>
                        <div class="flex items-center gap-2 col-span-6">
                            <RadioButton id="category3" v-model="product.category" name="category" value="Electronics" />
                            <label for="category3">Electronics</label>
                        </div>
                        <div class="flex items-center gap-2 col-span-6">
                            <RadioButton id="category4" v-model="product.category" name="category" value="Fitness" />
                            <label for="category4">Fitness</label>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-6">
                        <label for="price" class="block font-bold mb-3">Price</label>
                        <InputNumber id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US" fluid />
                    </div>
                    <div class="col-span-6">
                        <label for="quantity" class="block font-bold mb-3">Quantity</label>
                        <InputNumber id="quantity" v-model="product.quantity" integeronly fluid />
                    </div>
                </div>
            </div>

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Save" icon="pi pi-check" @click="saveProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="product"
                    >Are you sure you want to delete <b>{{ product.name }}</b
                    >?</span
                >
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
                <Button label="Yes" icon="pi pi-check" @click="deleteProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="product">Are you sure you want to delete the selected products?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
            </template>
        </Dialog>
    </div>
</template>
