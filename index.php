<?php include "header.php"; ?>

<div class="nav-item">
    <a class="nav-link text text--flashy" href="https://www.wedontca.re/the-madness" target="_self">The Madness!</a>
</div>

<div class="nav-item">
    <a class="nav-link" id="nav-link-latest" href="https://www.wedontca.re/music" target="_self">Music</a>
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

    <form action="mailing-signup" class="form form--width-small" id="form-mailing">
        <div class="form__field form__field--inline-send">
            <label class="form__label sr-only" for="mailing-email">Enter your email to stay up to date</label>
            <input class="form__input" type="mailing-email" name="email" id="mailing-email" placeholder="Enter your email to stay up to date" minlength="4" maxlength="256">
            <button class="form__submit btn" type="submit">Sign up</button>
        </div>
    </form>
</section>

<?php include "footer.php"; ?>
