const { createApp } = Vue;
const apiUrl = 'http://localhost:8080';

createApp({
  data() {
    return {
      artikel: [],
      kategoriList: [],
      formData: {
        id: null,
        judul: '',
        isi: '',
        status: 0,
        id_kategori: ''
      },
      showForm: false,
      formTitle: 'Tambah Data',
      statusOptions: [
        { text: 'Draft', value: 0 },
        { text: 'Publish', value: 1 },
      ],
    };
  },

  mounted() {
    this.loadData();
    this.loadKategori();
  },

  methods: {
    loadData() {
      axios.get(`${apiUrl}/post`)
        .then(response => {
          this.artikel = response.data;
        })
        .catch(error => console.log(error));
    },

    loadKategori() {
      axios.get(`${apiUrl}/kategori`)
        .then(response => {
          this.kategoriList = response.data;
        })
        .catch(error => console.log(error));
    },

    statusText(status) {
      return status == 1 ? 'Publish' : 'Draft';
    },

    tambah() {
      this.showForm = true;
      this.formTitle = 'Tambah Data';
      this.formData = {
        id: null,
        judul: '',
        isi: '',
        status: 0,
        id_kategori: ''
      };
    },

    edit(data) {
      this.showForm = true;
      this.formTitle = 'Ubah Data';
      this.formData = { ...data };
    },

    hapus(index, id) {
      if (confirm('Yakin menghapus data?')) {
        axios.delete(`${apiUrl}/post/${id}`)
          .then(response => {
            this.artikel.splice(index, 1);
          })
          .catch(error => console.log(error));
      }
    },

    saveData() {
      if (this.formData.id) {
        axios.put(`${apiUrl}/post/${this.formData.id}`, this.formData)
          .then(response => this.loadData())
          .catch(error => console.log(error));
      } else {
        axios.post(`${apiUrl}/post`, this.formData)
          .then(response => this.loadData())
          .catch(error => console.log(error));
      }

      this.showForm = false;
      this.formData = {
        id: null,
        judul: '',
        isi: '',
        status: 0,
        id_kategori: ''
      };
    }
  }
}).mount('#app');
