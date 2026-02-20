document.addEventListener('DOMContentLoaded', function() {
    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Automatic Table of Contents
    const tocContent = document.getElementById('toc-content');
    const articleBody = document.querySelector('.article-content');
    
    if (tocContent && articleBody) {
        const headings = articleBody.querySelectorAll('h2, h3');
        if (headings.length > 0) {
            const ul = document.createElement('ul');
            headings.forEach((heading, index) => {
                const id = 'heading-' + index;
                heading.id = id;
                
                const li = document.createElement('li');
                li.className = heading.tagName.toLowerCase() === 'h3' ? 'ms-4' : '';
                
                const a = document.createElement('a');
                a.href = '#' + id;
                a.textContent = heading.textContent;
                
                li.appendChild(a);
                ul.appendChild(li);
            });
            tocContent.appendChild(ul);
        } else {
            document.querySelector('.toc-container').style.display = 'none';
        }
    }

    // TOC Toggle
    const tocHeader = document.querySelector('.toc-header');
    if (tocHeader) {
        tocHeader.addEventListener('click', () => {
            const content = document.getElementById('toc-content');
            const icon = tocHeader.querySelector('i');
            if (content.style.display === 'none') {
                content.style.display = 'block';
                icon.className = 'bi bi-chevron-up';
            } else {
                content.style.display = 'none';
                icon.className = 'bi bi-chevron-down';
            }
        });
    }

    // Share Functionality
    const shareBtns = document.querySelectorAll('.share-btn');
    shareBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            let shareUrl = '';

            if (btn.classList.contains('fb')) {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            } else if (btn.classList.contains('tw')) {
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            } else if (btn.classList.contains('wa')) {
                shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`;
            }

            window.open(shareUrl, '_blank', 'width=600,height=400');
        });
    });
});
