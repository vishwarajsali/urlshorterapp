const { request } = require("express");

const app = new Vue({
  el: '#app',
  data: {
    url: '',
    slug: '',
    error: '',
    formVisible: true,
    created: null,
  },
  methods: {
    async createUrl() {
      console.log(window.location.href);
      this.error = '';
<<<<<<< HEAD
      const response = await fetch(`${window.location.href}url`, {
=======
      console.log(request.url);
      const response = await fetch('https://url.vishwaraj.dev/url', {
>>>>>>> 1eab7ca95afad10e5f1b63da347b88dd1e8ea830
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          url: this.url,
          slug: this.slug || undefined,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        this.formVisible = false;
<<<<<<< HEAD
        this.created = `${window.location.href}${result.slug}`;
=======
        this.created = `https://url.vishwaraj.dev/${result.slug}`;
>>>>>>> 1eab7ca95afad10e5f1b63da347b88dd1e8ea830
      } else if (response.status === 429) {
        this.error = 'You are sending too many requests. Try again in 30 seconds.';
      } else {
        const result = await response.json();
        this.error = result.message;
      }
    },
  },
});