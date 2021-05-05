<?php include "header.php"; ?>

<div class="nav-item">
    <a class="nav-link text text--flashy" href="https://shop.wedontcaregroup.com" target="_self">Webshop</a>
</div>

<div class="nav-item">
    <a class="nav-link" id="nav-link-latest" href="https://latest.wedontcaregroup.com" target="_self">Latest</a>

    <div
        class="rollout"
        id="rollout-latest"
        aria-describedby="nav-link-latest"
        data-rollout-text-1="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        data-rollout-text-2="Ut mauris neque, sagittis a ullamcorper quis, pellentesque dapibus ante."
        data-rollout-text-3="Duis et nunc ac nisl elementum viverra."
        data-rollout-text-4="Curabitur nec vulputate purus, ut ultrices nibh."
    ></div>
</div>

<div class="nav-item">
    <a class="nav-link" href="#" target="_blank">YouTube</a>
</div>

<div class="nav-item">
    <a class="nav-link" href="#" target="_blank">Instagram</a>
</div>

<section class="content">
    <div class="spinning-logo">
        <div class="aspect-ratio aspect-ratio--square" aria-hidden="true">
            <div class="content">
                <video poster="https://via.placeholder.com/600x400">Your browser sucks and does not support awesomeness.</video>
            </div>
        </div>

        <span class="sr-only">
            We Don't Care
        </span>
    </div>

    <form class="form form--width-small" id="form-mailing">
        <div class="form__field form__field--inline-send">
            <label class="form__label sr-only" for="mailing-email">Enter your email to stay up to date</label>
            <input class="form__input" type="mailing-email" name="mailing-email" id="mailing-email" placeholder="Enter your email to stay up to date">
            <button class="form__submit btn" type="submit">Sign up</button>
        </div>
    </form>
</section>

<?php include "footer.php"; ?>
